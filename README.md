# @mysticaldragon/proxies

Easy recursive and non-recursive javascript proxies

## Elastic proxies
ElasticProxies are javascript objects with unlimited getter and setters, they can also act as functions or classes.

```ts

import { ElasticProxy } from "@mysticaldragon/proxies";

const proxy = ElasticProxy.new({
    recursive?: false;

    set: (path: string, prop: any) => { // Optional
      console.log("SET", path, "to", prop);
    },
    
    get: (path: string) => {  // Optional
      console.log("GET", path);
      return 0;
    },
    
    apply?: (args: any[]) => { // Optional
      console.log("CALL", "with args", args);
      return 1;
    },
    
    new?: (args: any[]) => { // Optional
      console.log("NEW", args);
 
      return 2;
    }
});

proxy.name = "Camilo"; // console.log("SET", "name", "to", "Camilo");
const foo = proxy.value; // console.log("GET", "value");, returns 0 (Result of get function above)
proxy(1, 2, 3); // console.log("CALL", [1, 2, 3]);, returns 1 (Result of apply function above)
const bar = new proxy(1,2,3); // console.log("NEW", [1,2,3]);, returns 2 (Result of new function above)
```

## Recursive proxies

RecursiveProxies are similar to ElasticProxies, but their properties can be accessed with unlimited depth:

Only apply and new functions are allowed, setter and getters are not because all children properties of recursive proxies are also recursive proxies by itself.

```ts
import { ElasticProxy } from "@mysticaldragon/proxies";

const proxy = ElasticProxy.new({
    recursive?: true;
    
    apply?: (path: string[], args: any[]) => { // Optional
      console.log("CALL", path, "with args", args);
    },
    
    new?: (path: string[], args: any[]) => { // Optional
      console.log("NEW", path, "with args", args);
    }
});

proxy.camilo.age.year(1998); // console.log("CALL", ["camilo", "age", "year"], "with args", [1998]);
new proxy.camilo.dog({ name: "Hitler" }) = 1998; // console.log("NEW", ["camilo", "age", "year"], "with args", [{ name: "Hitler" }]);
```

With recursive proxies you can wrap around complex apis and make native-like calls to other services.
