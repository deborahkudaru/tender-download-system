import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import TenderList from "../components/TenderList.vue";

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        tenders: [
          {
            id: 1,
            title: "Web Development",
            description: "Build website",
            tags: ["frontend", "vue"],
          },
          {
            id: 2,
            title: "Mobile App",
            description: "Create mobile app",
            tags: ["android"],
          },
          {
            id: 3,
            title: "API Project",
            description: "Develop backend",
            tags: ["node"],
          },
          {
            id: 4,
            title: "UI Design",
            description: "Design interface",
            tags: ["figma"],
          },
        ],
      }),
  })
);

describe("TenderList.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(TenderList);
    await flushPromises();
  });

  it("renders tenders after fetching", () => {
    const tenderCards = wrapper.findAllComponents({ name: "TenderCard" });
    expect(tenderCards.length).toBeGreaterThan(0);
  });

  it("filters tenders based on search query", async () => {
    const searchBar = wrapper.findComponent({ name: "SearchBar" });
    await searchBar.vm.$emit("search", "Mobile");
    await flushPromises();
    const tenderTitles = wrapper.text();
    expect(tenderTitles).toContain("Mobile App");
    expect(tenderTitles).not.toContain("Web Development");
  });

  it("paginates tenders correctly", async () => {
    const nextButton = wrapper.find("button:has(.pi-chevron-right)");
    expect(nextButton.exists()).toBe(true);
    await nextButton.trigger("click");
    expect(wrapper.vm.currentPage).toBe(1);
  });

  it("opens and closes tender modal", async () => {
    const firstTender = wrapper.findComponent({ name: "TenderCard" });
    await firstTender.vm.$emit("show-details", {
      id: 1,
      title: "Web Development",
    });
    expect(wrapper.vm.showModal).toBe(true);

    await wrapper.vm.handleCloseModal();
    expect(wrapper.vm.showModal).toBe(false);
  });
});
