import { HarvesterService } from './services/HarvesterService.mjs';

async function run() {
    await HarvesterService.enterpriseHarvest();
}
run();
