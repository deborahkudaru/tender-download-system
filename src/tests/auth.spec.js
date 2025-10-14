import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../stores/auth";

describe("authStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should sign up a new user and store in localStorage", () => {
    const auth = useAuthStore();

    auth.signup("deborah", "1234");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    expect(storedUser).toEqual({ username: "deborah", password: "1234" });
    expect(auth.user).toEqual(storedUser);
  });

  it("should log in successfully with correct credentials", () => {
    const auth = useAuthStore();
    auth.signup("deborah", "1234");

    const loginResult = auth.login("deborah", "1234");
    expect(loginResult).toBe(true);
    expect(auth.user).toEqual({ username: "deborah", password: "1234" });
  });

  it("should fail login with wrong credentials", () => {
    const auth = useAuthStore();

    auth.signup("deborah", "1234");

    const loginResult = auth.login("deborah", "wrongpass");
    expect(loginResult).toBe(false);
    expect(auth.user).not.toEqual({
      username: "deborah",
      password: "wrongpass",
    });
  });

  it("logs out successfully", () => {
    const store = useAuthStore();
    store.login("admin", "password");
    store.logout();
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBeNull();
  });
});
