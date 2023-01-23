import sampleReducer, {
  SampleState,
  sampleAction1,
  sampleAction2,
  sampleAsyncAction,
  sampleTypedThunkAction,
  sampleSelector,
} from "./_sampleSlice";

describe("sample reducer", () => {
  const initialState: SampleState = {
    value: 3,
    status: "idle",
  };

  //test proper setup of initial state
  it("should handle initial state", () => {
    expect(sampleReducer(undefined, { type: "unknown" })).toEqual({
      value: 0,
      status: "idle",
    });
  });

  //test each action an confirm proper state change
  it("should handle sampleAction1", () => {
    const actual = sampleReducer(initialState, sampleAction1());
    expect(actual.value).toEqual(4);
  });
  it("should handle sampleAction2", () => {
    const actual = sampleReducer(initialState, sampleAction2(2));
    expect(actual.value).toEqual(5);
  });
});
