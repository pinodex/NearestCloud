import aws from './aws.json';
import gcp from './gcp.json';
import digitalocean from './digitalocean.json';

export default [
  {
    name: 'Amazon Web Services',
    regions: aws
  },
  {
    name: 'Google Cloud Platform',
    regions: gcp
  },
  {
    name: 'DigitalOcean',
    regions: digitalocean
  }
];
