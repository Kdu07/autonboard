import { ExcelReader } from './excel/ExcelReader';
import { ExcelParser } from './excel/ExcelParser';
import { ExcelValidator } from './excel/ExcelValidator';
import { ExcelMapper } from './excel/ExcelMapper';
import { IBookableResourceRepository } from '../repositories/IBookableResourceRepository';
import { BookableResourceModel } from '../models/BookableResourceModel';
import { BadRequestError } from '../errors/HttpError';
import { ParsedExcel } from './excel/types';

type ProcessExcelInput = {
  buffer: Buffer;
  originalname: string;
};

export type ProcessExcelResult = {
  raw: ParsedExcel;
  mapped: BookableResourceModel;
  saved: BookableResourceModel;
};

type UploadExcelDependencies = {
  repository: IBookableResourceRepository;
  reader?: ExcelReader;
  parser?: ExcelParser;
  validator?: ExcelValidator;
  mapper?: ExcelMapper;
};

export class UploadExcelService {
  private readonly reader: ExcelReader;
  private readonly parser: ExcelParser;
  private readonly validator: ExcelValidator;
  private readonly mapper: ExcelMapper;
  private readonly repository: IBookableResourceRepository;

  constructor({
    repository,
    reader,
    parser,
    validator,
    mapper,
  }: UploadExcelDependencies) {
    this.reader = reader ?? new ExcelReader();
    this.parser = parser ?? new ExcelParser();
    this.validator = validator ?? new ExcelValidator();
    this.mapper = mapper ?? new ExcelMapper();
    this.repository = repository;
  }

  async process({ buffer, originalname }: ProcessExcelInput): Promise<ProcessExcelResult> {
    if (!buffer || buffer.length === 0) {
      throw new BadRequestError('File buffer is required');
    }

    const worksheet = await this.reader.read(buffer, originalname);
    const parsed = this.parser.parse(worksheet);

    this.validator.validate(parsed);

    const mapped = this.mapper.map(parsed);
    const saved = await this.repository.save(mapped);

    return {
      raw: parsed,
      mapped,
      saved,
    };
  }
}
