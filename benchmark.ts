import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import { performance } from "perf_hooks";

const DATASET_SIZE = 50000;
const RUNS_PER_TEST = 3;

const batchSizes = [100, 500, 1000, 2000];
const workerCounts = [2, 8, 16];

// --------------------
// Criar dataset
// --------------------
async function createDataset(filePath: string, rows: number) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    for (let i = 0; i < rows; i++) {
        worksheet.addRow([i, `Nome ${i}`, `Email ${i}@teste.com`, "Ativo"]);
    }

    await workbook.xlsx.writeFile(filePath);
}

// --------------------
// Dividir em batches
// --------------------
function createBatches(rows: any[], batchSize: number) {
    const batches = [];
    for (let i = 0; i < rows.length; i += batchSize) {
        batches.push(rows.slice(i, i + batchSize));
    }
    return batches;
}

// --------------------
// Simular processamento real
// --------------------
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processBatch(batch: any[]) {
    // simula I/O (rede, banco, etc.)
    await sleep(2);

    // simula CPU leve
    let sum = 0;
    for (const row of batch) {
        for (let i = 0; i < 50; i++) {
            sum += i;
        }
    }

    return sum;
}

// --------------------
// Workers
// --------------------
async function runWithWorkers(batches: any[], workerCount: number) {
    let index = 0;

    async function worker() {
        while (true) {
            const currentIndex = index++;
            if (currentIndex >= batches.length) break;

            await processBatch(batches[currentIndex]);
        }
    }

    const workers = [];
    for (let i = 0; i < workerCount; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);
}

// --------------------
// Benchmark
// --------------------
async function runBenchmark(filePath: string, batchSize: number, workerCount: number) {
    const readWorkbook = new ExcelJS.Workbook();
    await readWorkbook.xlsx.readFile(filePath);
    const sheet = readWorkbook.worksheets[0];

    const rows: any[] = [];
    sheet.eachRow((row) => {
        rows.push(row.values);
    });

    const batches = createBatches(rows, batchSize);

    const start = performance.now();

    await runWithWorkers(batches, workerCount);

    const end = performance.now();

    const durationSeconds = (end - start) / 1000;

    // proteção contra divisão por zero
    const throughput = durationSeconds > 0 
        ? rows.length / durationSeconds 
        : 0;

    return { durationSeconds, throughput };
}

// --------------------
// Main
// --------------------
async function main() {
    const filePath = path.join(__dirname, "temp_benchmark.xlsx");

    console.log("Criando dataset...");
    await createDataset(filePath, DATASET_SIZE);

    const results: any[] = [];

    for (const B of batchSizes) {
        for (const W of workerCounts) {
            let totalThroughput = 0;
            let totalTime = 0;

            console.log(`\nTestando B=${B}, W=${W}...`);

            for (let i = 0; i < RUNS_PER_TEST; i++) {
                const { durationSeconds, throughput } = await runBenchmark(filePath, B, W);

                totalThroughput += throughput;
                totalTime += durationSeconds;
            }

            const avgThroughput = totalThroughput / RUNS_PER_TEST;
            const avgTime = totalTime / RUNS_PER_TEST;

            results.push({
                batchSize: B,
                workers: W,
                avgTime: avgTime.toFixed(4),
                avgThroughput: avgThroughput.toFixed(2),
            });
        }
    }

    console.log("\nRESULTADOS FINAIS:");
    console.table(results);

    fs.unlinkSync(filePath);
}

main().catch(console.error);