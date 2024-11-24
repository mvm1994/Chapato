namespace Chapato.Application.Services.Products.Queries.GetUserOption_Items
{
    public class UserOptionItem
    {
        public long Id { get; set; }
        public long OptionId { get; set; }
        public long? ParentOptionId { get; set; } = 0;
        public long? ParentOptionItemId { get; set; } = 0;
        public string Name { get; set; }
        public int Price { get; set; }
        public string Option_Type { get; set; }
        public string Item_Group { get; set; }
    }
}
