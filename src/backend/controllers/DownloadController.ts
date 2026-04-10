import { Request, Response } from 'express';
import { DownloadService } from '../services/DownloadService';

const EXT_MAP: Record<string, string> = {
  'text/csv': 'csv',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
};

export async function download(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const record = await DownloadService.getById(id);
    const ext = EXT_MAP[record.file_type] ?? 'bin';
    const filename = `submission_${id}.${ext}`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', record.file_type || 'application/octet-stream');
    res.send(record.file);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Erro ao fazer download.' });
  }
}
