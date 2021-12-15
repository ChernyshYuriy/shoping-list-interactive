import { addBug } from "../bugs";
import store from "../store";

it("should handle the addBug action", () => {
  const storeTest = store();
  const bug = { description: "a" };
  storeTest.dispatch(addBug(bug));
  console.log(storeTest.getState());
});

// import { apiCallBegan } from "../api";
// import { addBug, bugAdded } from "../bugs";

// it("addBug", () => {
//   const result = addBug({ description: "a" });
//   const exp = {
//     type: apiCallBegan.type,
//     payload: {
//       url: "/shortUserList",
//       method: "post",
//       data: { description: "a" },
//       onSuccess: bugAdded.type,
//     },
//   };
//   expect(result).toEqual(exp);
// });
