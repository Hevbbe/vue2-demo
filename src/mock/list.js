import Mock from "mockjs";
const Random = Mock.Random;

// 轮播图
Mock.mock("/api/carousel", "get", (options) => {
  const { count } = JSON.parse(options.body);

  const list = Mock.mock({
    [`array|${count}`]: [
      {
        id: "@guid", // 全局唯一 ID
        img: Random.image("640x150", "#f7ba1e", "#fff", "jpg"),
        desc: "@cparagraph(1)", // 随机中文描述（可选）
      },
    ],
  }).array;

  return {
    code: 200,
    list,
    total: count,
  };
});
