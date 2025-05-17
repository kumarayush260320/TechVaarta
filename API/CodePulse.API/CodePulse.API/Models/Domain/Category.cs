namespace CodePulse.API.Models.Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UrlHandlen { get; set; }

        //many to many relation
        public ICollection<BlogPost> BlogPosts { get; set; }
    }
}
