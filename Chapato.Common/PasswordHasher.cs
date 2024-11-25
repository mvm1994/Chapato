﻿using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Common
{
    public class PasswordHasher
    {
        private readonly bool _useAspNetCore;
        private readonly byte _formatMarker;
        private readonly KeyDerivationPrf _prf;
        private readonly HashAlgorithmName _hashAlgorithmName;
        private readonly bool _includeHeaderInfo;
        private readonly int _saltLength;
        private readonly int _requestedLength;
        private readonly int _iterCount;

        public PasswordHasher()
        {
            _useAspNetCore = true;

            _formatMarker = 0x01;
            _prf = KeyDerivationPrf.HMACSHA256;
            _hashAlgorithmName = HashAlgorithmName.SHA256;
            _includeHeaderInfo = true;
            _saltLength = 128 / 8;
            _requestedLength = 256 / 8;
            _iterCount = 10000;

        }

        public string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password)) throw new ArgumentNullException(nameof(password));

            byte[] salt = new byte[_saltLength];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            byte[] subkey = new byte[_requestedLength];
            if (_useAspNetCore)
            {
                subkey = KeyDerivation.Pbkdf2(password, salt, _prf, _iterCount, _requestedLength);
            }
            else
            {
                using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, _iterCount, _hashAlgorithmName);
                subkey = pbkdf2.GetBytes(_requestedLength);
            }

            var headerByteLength = 1;
            if (_includeHeaderInfo) headerByteLength = 13;

            var outputBytes = new byte[headerByteLength + salt.Length + subkey.Length];

            outputBytes[0] = _formatMarker;

            if (_includeHeaderInfo)
            {
                if (_useAspNetCore)
                {
                    WriteNetworkByteOrder(outputBytes, 1, (uint)_prf);
                }
                else
                {
                    var shaInt = 1;
                    if (_hashAlgorithmName == HashAlgorithmName.SHA1) shaInt = 0;
                    else if (_hashAlgorithmName == HashAlgorithmName.SHA256) shaInt = 1;
                    else if (_hashAlgorithmName == HashAlgorithmName.SHA512) shaInt = 2;

                    WriteNetworkByteOrder(outputBytes, 1, (uint)shaInt);
                }

                WriteNetworkByteOrder(outputBytes, 5, (uint)_iterCount);
                WriteNetworkByteOrder(outputBytes, 9, (uint)_saltLength);
            }

            Buffer.BlockCopy(salt, 0, outputBytes, headerByteLength, salt.Length);
            Buffer.BlockCopy(subkey, 0, outputBytes, headerByteLength + _saltLength, subkey.Length);

            return Convert.ToBase64String(outputBytes);
        }

        public bool VerifyPassword(string hashedPassword, string enteredPassword)
        {
            if (string.IsNullOrEmpty(enteredPassword) || string.IsNullOrEmpty(hashedPassword)) return false;

            byte[] decodedHashedPassword;
            try
            {
                decodedHashedPassword = Convert.FromBase64String(hashedPassword);
            }
            catch (Exception)
            {
                return false;
            }

            if (decodedHashedPassword.Length == 0) return false;

            var verifyMarker = decodedHashedPassword[0];
            if (_formatMarker != verifyMarker) return false;

            try
            {
                if (_includeHeaderInfo)
                {
                    var shaUInt = ReadNetworkByteOrder(decodedHashedPassword, 1);
                    var verifyPrf = shaUInt switch
                    {
                        0 => KeyDerivationPrf.HMACSHA1,
                        1 => KeyDerivationPrf.HMACSHA256,
                        2 => KeyDerivationPrf.HMACSHA512,
                        _ => KeyDerivationPrf.HMACSHA256,
                    };
                    if (_prf != verifyPrf) return false;

                    var verifyAlgorithmName = shaUInt switch
                    {
                        0 => HashAlgorithmName.SHA1,
                        1 => HashAlgorithmName.SHA256,
                        2 => HashAlgorithmName.SHA512,
                        _ => HashAlgorithmName.SHA256,
                    };
                    if (_hashAlgorithmName != verifyAlgorithmName) return false;

                    int iterCountRead = (int)ReadNetworkByteOrder(decodedHashedPassword, 5);
                    if (_iterCount != iterCountRead) return false;

                    int saltLengthRead = (int)ReadNetworkByteOrder(decodedHashedPassword, 9);
                    if (_saltLength != saltLengthRead) return false;
                }

                var headerByteLength = 1;
                if (_includeHeaderInfo) headerByteLength = 13;

                byte[] salt = new byte[_saltLength];
                Buffer.BlockCopy(decodedHashedPassword, headerByteLength, salt, 0, salt.Length);

                int subkeyLength = decodedHashedPassword.Length - headerByteLength - salt.Length;

                if (_requestedLength != subkeyLength) return false;

                byte[] expectedSubkey = new byte[subkeyLength];
                Buffer.BlockCopy(decodedHashedPassword, headerByteLength + salt.Length, expectedSubkey, 0, expectedSubkey.Length);

                byte[] actualSubkey = new byte[_requestedLength];
                if (_useAspNetCore)
                {
                    actualSubkey = KeyDerivation.Pbkdf2(enteredPassword, salt, _prf, _iterCount, subkeyLength);
                }
                else
                {
                    using var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, _iterCount, _hashAlgorithmName);
                    actualSubkey = pbkdf2.GetBytes(_requestedLength);
                }

                return ByteArraysEqual(actualSubkey, expectedSubkey);
            }
            catch
            {
                return false;
            }
        }

        [MethodImpl(MethodImplOptions.NoInlining | MethodImplOptions.NoOptimization)]
        private static bool ByteArraysEqual(byte[] a, byte[] b)
        {
            if (a == null && b == null) return true;
            if (a == null || b == null || a.Length != b.Length) return false;
            var areSame = true;
            for (var i = 0; i < a.Length; i++) { areSame &= a[i] == b[i]; }
            return areSame;
        }

        private static uint ReadNetworkByteOrder(byte[] buffer, int offset)
        {
            return (uint)buffer[offset + 0] << 24
                | (uint)buffer[offset + 1] << 16
                | (uint)buffer[offset + 2] << 8
                | buffer[offset + 3];
        }

        private static void WriteNetworkByteOrder(byte[] buffer, int offset, uint value)
        {
            buffer[offset + 0] = (byte)(value >> 24);
            buffer[offset + 1] = (byte)(value >> 16);
            buffer[offset + 2] = (byte)(value >> 8);
            buffer[offset + 3] = (byte)(value >> 0);
        }
    }
}
