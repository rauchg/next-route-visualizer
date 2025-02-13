import { Route, RouteData } from "./types";

/**
 * For debugging purposes
 * @param route - route to log
 * @param indent - not needed for first call
 */
export const logRoute = (route: Route, indent?: string) => {
  console.log(`${indent ?? ''}{`);
  console.log(`${indent ?? ''}  id:   ${route.data.id},`);
  console.log(`${indent ?? ''}  name: ${route.data.name},`);
  console.log(`${indent ?? ''}  path: ${route.data.path},`);
  console.log(`${indent ?? ''}  link: ${route.data.link},`);
  console.log(`${indent ?? ''}  depth: ${route.data.depth},`);
  console.log(`${indent ?? ''}  maxSpan: ${route.data.maxSpan},`);
  console.log(`${indent ?? ''}  spanSize: ${route.data.spanSize},`);
  console.log(`${indent ?? ''}  directlySpanning: ${route.data.directlySpanning},`);
  console.log(`${indent ?? ''}  type: ${route.data.type},`);
  route.data.parentID ? console.log(`${indent ?? ''}  parentID: ${route.data.parentID},`) : null;
  if (route.data.includedFiles) {
    console.log(`${indent ?? ''}  includedFiles: {`);
    Object.keys(route.data.includedFiles).map((file) => {
      console.log(`${indent ?? ''}    ${file},`);
    });
    console.log(`${indent ?? ''}  },`);
  }
  if (route.data.childrenID) {
    console.log(`${indent ?? ''}  childrenID: [`);
    route.data.childrenID.map((child) => {
      console.log(`${indent ?? ''}    ${child},`);
    });
    console.log(`${indent ?? ''}  ],`);
  }
  if (!route.children) {
    console.log(`${indent ?? ''}},`);
    return;
  }
  console.log(`${indent ?? ''}  children: [`);
  route.children.forEach((child) => {
    logRoute(child, `${indent ?? ''}    `);
  });
  console.log(`${indent ?? ''}  ]`);
  console.log(`${indent ?? ''}}`);
};

/**
 * Flatten the route tree into an array
 * @param route - route to convert to array
 * @returns RouteData[]
 */
export const routeToArray = (route: Route) => {
  const routeArray = [] as RouteData[];
  return routeToArrayHelper(route, routeArray);
};

const routeToArrayHelper = (
  route: Route,
  result: RouteData[],
) => {
  result.push(route.data);
  route.children?.forEach((child) => {
    routeToArrayHelper(child, result);
  });
  return result;
};