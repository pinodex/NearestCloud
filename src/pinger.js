import { Observable } from 'rxjs';

export function time() {
  return new Date().getTime();
}

export function ping(url, interval = 300) {
  return new Promise((resolve) => {
    const image = new Image();
    const cacheBuster = Math.random();

    let latency = null;
    let startTime = time();
    let endTime = 0;

    image.onload = image.onerror = () => {
      endTime = time();
      latency = endTime - startTime;

      setTimeout(() => resolve({ startTime, endTime, latency }), interval);
    }

    image.src = `${url}?${cacheBuster}`;
  });
}

/**
 * Pinger factory
 *
 * @param  {Array}  regions Array of regions
 * @param  {Number} count   Number of ping per region
 * @return {Observable}     rxjs Observable
 */
export function makePinger(regions = [], count = 3) {
  return new Observable(async (subscriber) => {
    for (let index = 0; index < regions.length; index++) {
      const { url } = regions[index];
      const results = [];

      for (let trial = 0; trial < count; trial++) {
        results.push(await ping(url));
      }

      subscriber.next({
        index,
        results
      });
    }

    subscriber.complete();
  });
}
