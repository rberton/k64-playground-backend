import mongoose from "mongoose";

describe("Index tests", () => {
  it("Mongoose id defined", () => {
    expect(mongoose).toBeDefined();
  });
});
