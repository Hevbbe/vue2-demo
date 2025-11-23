import request from "@/utils/request";

export function getCarousel(data) {
  return request({
    url: "/api/carousel",
    method: "get",
    data,
  });
}
