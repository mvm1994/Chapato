namespace Chapato.Application.Services.Products.Commands.MoveOrCopyChartCategory
{
    public class RequestMoveOrCopyChartCategoryDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long ParentId { get; set; }
        public bool IsCut { get; set; }
    }
}
