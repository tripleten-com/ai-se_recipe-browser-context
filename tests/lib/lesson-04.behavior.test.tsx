import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "../../src/contexts/FavoritesContext";
import App from "../../src/components/App/App";

function renderApp() {
  return render(
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>,
  );
}

describe("Lesson 04 — context replaces prop chain", () => {
  it("favoriting a recipe still works after removing the prop chain", async () => {
    const user = userEvent.setup();
    renderApp();

    const addButtons = await screen.findAllByRole("button", {
      name: /add to favorites/i,
    });
    await user.click(addButtons[0]);

    expect(
      screen.getByRole("button", { name: /remove from favorites/i }),
    ).toBeInTheDocument();
  });

  it("unfavoriting a recipe still works after removing the prop chain", async () => {
    const user = userEvent.setup();
    renderApp();

    const addButton = (
      await screen.findAllByRole("button", { name: /add to favorites/i })
    )[0];
    await user.click(addButton);

    await user.click(
      screen.getByRole("button", { name: /remove from favorites/i }),
    );

    expect(
      screen.queryByRole("button", { name: /remove from favorites/i }),
    ).not.toBeInTheDocument();
  });

  it("toggling one recipe does not affect other recipes", async () => {
    const user = userEvent.setup();
    renderApp();

    const addButtons = await screen.findAllByRole("button", {
      name: /add to favorites/i,
    });
    expect(addButtons.length).toBeGreaterThanOrEqual(2);

    await user.click(addButtons[0]);

    const remaining = screen.getAllByRole("button", {
      name: /add to favorites/i,
    });
    expect(remaining.length).toBe(addButtons.length - 1);
  });

  it("the header favorites count updates when recipes are toggled", async () => {
    const user = userEvent.setup();
    renderApp();

    const addButtons = await screen.findAllByRole("button", {
      name: /add to favorites/i,
    });

    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    const header = screen.getByRole("banner");
    expect(header.textContent).toContain("2");
  });
});