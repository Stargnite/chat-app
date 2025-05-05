import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'http',
    enabledTransports: ['ws'],
});

export default window.Echo;

















// import axios from "@/api/api";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//     Echo: Echo<any>;
//   }
// }

// window.Pusher = Pusher;

// const host = import.meta.env.VITE_REVERB_HOST || "localhost";
// const port = Number(import.meta.env.VITE_REVERB_PORT) || 80;
// // const scheme = import.meta.env.VITE_REVERB_SCHEME || "http";

// window.Echo = new Echo({
//   broadcaster: "reverb",
//   key: import.meta.env.VITE_REVERB_APP_KEY,
//   wsHost: host,
//   wsPort: port,
//   // wssPort: port,
//   forceTLS: false,
//   encrypted: false,
//   enabledTransports: ["ws"],
//   // authorizer: (channel: any) => ({
//   //   authorize: (socketId: string, callback: (error: boolean, data: any) => void) => {
//   //     axios.post("https://chat-api.vindove.com:8080/api/broadcasting/auth", {
//   //       socket_id: socketId,
//   //       channel_name: channel.name,
//   //     }, {
//   //       headers: {
//   //         Authorization: `Bearer dzEzazRiOWRoNmo4Zzh3YTg4Ti9selYxVlpHbVBPQUM0Y1h0U0U2eXVQK3JaZ2o1K05PRjBSeW4xU0FoQlA1Zk1IMWlZUUNVUGYxUVNXVU9YZ3BFeUxOZWlLYlJnVlhiL0dzZUhBQk8wQm13RVZBcEFQS3I4N0cwVmd3eWZ3WVNLbHZVamN0RnZqZ3NZYzQvYTZjeWZlOXRBQ1QyQkgwTkc4MUJyWmlLMFJzeEg2MjNMMUpFQWp3VlErd05SM0xpeHJGbVBCQS96NUNLNGFjajJwOElKekJUMmJ1U04xaHBjV0VyR0k3OWlaT0pUb0pCVHEvTDVZMGdiYWdpUlFFOGlnTktDQ2Y2VmkwVEI4cUh0elgzQ200NytVTkVSbW5za1ZKK0Q3c3JnWXRwdEhLQmNhVXYzSStwZ2ZheFBqQ1BROUpxYkgrS1ZlVjVzYVUxL1lUaG5aYlVTekd5UUtmRDRteTRDNXVpM1VXYUhwYm9tZG1JeXpPcFRwZXN2MW9RR1NNSEt4NWttenJEd1Rua1JRcGFhVElTNDB3VGxiUFpQanJDT2xXUlIrUWp4NG84c1pLaHIrRlFuU2VJejNPR2Q0V2J4UVBRL0Z3TGN3djRuUzNIbjZBalNtRVZyQzVLcXFVVCtPY3BhOHhSNUtDbmpObTF5UzI4SlRvaFhvMkYxekdJQlBaT25IMWxxWXdqcDc1RzBlMGpTMHhFUUk2QjJsL2ltbFBlTkVlcFNlcU5VYXh1RExLNXMzUmlRY0t6UEdlaWI1TWhwQkJEZVhsSDFTUGdIT2dFZ0U1dzZqOWp4WUJDM3BPcWpkQmZ2Mk5FOFB2VEtEajNwSitEaTlMbjRVbEFHN01KaGtCM2o2aU1vRzRvN0xwY3lybkJOQW85eFdGMy9xYlhDNmtCZzZYUEdOZVc2OUtCa3kxRXhNZmxsVG5nUXlIV1UycXdmTWJBNHdMN3dxR3N0bHVFQXhCeXM4U2lrUE9tbmszdEFkbjBuN0JwRXNiUHN5VXdCeldjSXdPZElaTUJiVk5keHRXeXdiMnkrSi9BQkJwaFhuaWg4MFpwT3RFclNKellRWkJwanFuTEJNaWNtY1c4OUphRHc2ckx4YXVDTWtha0JobW1lSkgwdzE3ZWVuMEJTbWNvQjBQNVVObnJ1RksxRDRYRFhJUi9yejBwWktVPQ `,
//   //       },
//   //     })
//   //     .then(response => callback(false, response.data))
//   //     .catch(error => callback(true, error));
//   //   },
//   // }),
// });

// export default window.Echo;




// // import axios from "@/api/api";
// // import Echo from "laravel-echo";
// // import Pusher from "pusher-js";

// // // Ensure TypeScript recognizes Pusher globally
// // declare global {
// //   interface Window {
// //     Pusher: typeof Pusher;
// //     Echo: Echo<any>;
// //   }
// // }
// // window.Pusher = Pusher;
// // window.Echo = new Echo({
// //   broadcaster: "pusher",
// //   key: import.meta.env.VITE_REVERB_APP_KEY as string, // Explicitly cast environment variable
// //   authorizer: (channel: any) => {
// //     return {
// //       authorize: (socketId: string, callback: (error: boolean, data: any) => void) => {
// //         axios
// //           .post("/api/broadcasting/auth", {
// //             socket_id: socketId,
// //             channel_name: channel.name,
// //           },{
// //                 headers: {
// //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
// //                 },
// //             })
// //           .then((response) => {
// //             callback(false, response.data);
// //           })
// //           .catch((error) => {
// //             callback(true, error);
// //           });
// //       },
// //     };
// //   },
// //   wsHost: import.meta.env.VITE_REVERB_HOST as string,
// //   wsPort: (import.meta.env.VITE_REVERB_PORT as unknown as number) ?? 80,
// //   wssPort: (import.meta.env.VITE_REVERB_PORT as unknown as number) ?? 443,
// //   forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
// //   enabledTransports: ["ws", "wss"],
// // });
// // export default window.Echo;