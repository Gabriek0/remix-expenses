import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Home" }];
};

export default function Index() {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}
