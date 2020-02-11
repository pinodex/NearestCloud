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
 * @return {Observable}     rxjs Observable
 */
export function makePinger(regions = []) {
  return new Observable(async (subscriber) => {
    for (var i = 0; i < regions.length; i++) {
      const { url } = regions[i];

      const result = await ping(url);

      subscriber.next({
        index: i,
        result
      });
    }

    subscriber.complete();
  });
}
