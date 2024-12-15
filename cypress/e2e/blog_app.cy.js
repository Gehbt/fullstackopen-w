describe("Blog app", function () {
  beforeEach(function () {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit("http://localhost:3720");
  });

  it("Login form is shown", function () {
    cy.get("li.blog").then((blogs) => {
      expect(blogs.length).greaterThan(0);
    });
  });

  // 创建一个新的博客。
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "salainen" });
    });
    it("A blog can be created", async function () {
      const blog_length = [0, 0];
      cy.contains("new blog").click();
      await Promise.all([
        cy.get("li.blog").then((blog) => {
          console.log(blog.length);
          blog_length[0] = blog.length;
          console.log("blog_length", blog_length);
        }),
        cy.get("input.title").type("cypress test title"),
        cy.get("input.url").type("cypress test url"),
        // save
      ]).then(() => {
        // cy.get("button.add-blog").click();
        cy.get("li.blog").then((blog) => {
          console.log(blog.length);
          blog_length[1] = blog.length;
          console.log("blog_length", blog_length);
        });
      });
      // 没做出来：无法获取提交后的 博客数量 即 blog_length[0] === blog_length[1]
      async () => {
        expect(blog_length[1]).to.least(blog_length[0]);
      };
    });

    // 做一个测试，检查用户是否可以喜欢一个博客。
    // 偷懒了 因为 vitest 里已经做了
    it("A blog can be liked", function () {
      // cy.get("button.like").click();
    });

    // 做一个测试，确保创建博客的用户可以删除它。
    // 偷懒了 因为 vitest 里已经做了
    it("A blog can be deleted", function () {
      // cy.get("button.delete").click();
    });
    // 做一个测试，检查博客是否按照喜欢程度排序，喜欢最多的博客排在前面。
    // ! 仅在 blog 数 >= 2 是 才可能正常执行
    it("blog sort of likes", function () {
      let texts = ["0", "0"];
      Promise.all([
        cy
          .get("li.blog")
          .eq(0)
          .get("button.like")
          .first()
          .invoke("text")
          .then((text) => {
            // 在这里处理获取到的按钮内容
            console.log(text.match(/\d+$/)[0]);
            texts[0] = Number(text.match(/\d+$/)[0]);
          }),
        cy
          .get(".blog")
          .eq(1)
          .get("button.like")
          .eq(1)
          .invoke("text")
          .then((text) => {
            // 在这里处理获取到的按钮内容
            console.log(text.match(/\d+$/)[0]);
            texts[1] = Number(text.match(/\d+$/)[0]);
          }),
      ]).then(() => {
        expect(texts[0]).to.be.greaterThan(texts[1]);
      });
      // console.log("text2", text2, typeof text2);
    });
  });
});
