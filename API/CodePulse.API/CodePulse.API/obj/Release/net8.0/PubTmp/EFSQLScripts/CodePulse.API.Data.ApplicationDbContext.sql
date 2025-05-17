IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250405200826_Initial Migration'
)
BEGIN
    CREATE TABLE [Blogposts] (
        [Id] uniqueidentifier NOT NULL,
        [Title] nvarchar(max) NOT NULL,
        [ShortDescription] nvarchar(max) NOT NULL,
        [Content] nvarchar(max) NOT NULL,
        [FeaturedImageUrl] nvarchar(max) NOT NULL,
        [UrlHandle] nvarchar(max) NOT NULL,
        [PublishedDate] datetime2 NOT NULL,
        [Author] nvarchar(max) NOT NULL,
        [IsVisible] bit NOT NULL,
        CONSTRAINT [PK_Blogposts] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250405200826_Initial Migration'
)
BEGIN
    CREATE TABLE [Categories] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [UrlHandlen] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Categories] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250405200826_Initial Migration'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250405200826_Initial Migration', N'9.0.3');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250415203138_Add Relationships'
)
BEGIN
    CREATE TABLE [BlogPostCategory] (
        [BlogPostsId] uniqueidentifier NOT NULL,
        [CategoriesId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_BlogPostCategory] PRIMARY KEY ([BlogPostsId], [CategoriesId]),
        CONSTRAINT [FK_BlogPostCategory_Blogposts_BlogPostsId] FOREIGN KEY ([BlogPostsId]) REFERENCES [Blogposts] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_BlogPostCategory_Categories_CategoriesId] FOREIGN KEY ([CategoriesId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250415203138_Add Relationships'
)
BEGIN
    CREATE INDEX [IX_BlogPostCategory_CategoriesId] ON [BlogPostCategory] ([CategoriesId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250415203138_Add Relationships'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250415203138_Add Relationships', N'9.0.3');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250426221856_Adding BlogImage Domain Model'
)
BEGIN
    CREATE TABLE [BlogImages] (
        [Id] uniqueidentifier NOT NULL,
        [FileName] nvarchar(max) NOT NULL,
        [FileExtensionn] nvarchar(max) NOT NULL,
        [Title] nvarchar(max) NOT NULL,
        [Url] nvarchar(max) NOT NULL,
        [DateCreated] datetime2 NOT NULL,
        CONSTRAINT [PK_BlogImages] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250426221856_Adding BlogImage Domain Model'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250426221856_Adding BlogImage Domain Model', N'9.0.3');
END;

COMMIT;
GO

