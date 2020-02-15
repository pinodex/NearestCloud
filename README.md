# NearestCloud

Find the region with the lowest latency

## How does this work?

This website measures the latency of your browser to different regions of different cloud providers.

It sends HTTP requests to web servers from cloud provider regions and measure the time it takes to get a response from the web server.

## Building NearestCloud

This website is built with [Svelte](https://svelte.dev/)

1. Clone this repository
2. Install dependencies
   ```sh
   npm install
   ```
3. Start development server
   ```sh
   npm run dev
   ```
4. Build for production
   ```sh
   npm run build
   ```

## Providers

Providers are stored in JSON files and can be found at [`src/providers`](src/providers)
