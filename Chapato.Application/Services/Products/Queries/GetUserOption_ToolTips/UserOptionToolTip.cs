namespace Chapato.Application.Services.Products.Queries.GetUserOption_ToolTips
{
    public class UserOptionToolTip
    {
        public long Id { get; set; }
        public long OptionId { get; set; }
        public long? ParentOptionId { get; set; } = 0;
        public long? ParentItemId { get; set; } = 0;
        public string Title { get; set; }
        public string Text { get; set; }
    }
}
