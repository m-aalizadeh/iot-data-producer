import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  private readonly sampleData: any;

  constructor() {
    try {
      const dataPath = join(__dirname, '../public/sample-data.json');
      this.sampleData = JSON.parse(readFileSync(dataPath, 'utf8'));
      console.log('Successfully loaded sample data');
    } catch (error) {
      console.error('Error loading sample data:', error);
      throw new Error('Failed to load sample data');
    }
  }

  getSampleData() {
    return this.sampleData;
  }
}
