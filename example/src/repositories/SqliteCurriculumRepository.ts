import { Curriculum } from '../models/Curriculum';
import { ICurriculumRepository } from './ICurriculumRepository';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export class SqliteCurriculumRepository implements ICurriculumRepository {
  private dbPromise: Promise<Database>;

  constructor() {
    this.dbPromise = open({
      filename: 'curriculum.db',
      driver: sqlite3.Database
    });
    this.init();
  }

  private async init() {
    const db = await this.dbPromise;
    await db.run(`CREATE TABLE IF NOT EXISTS curriculums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      version INTEGER NOT NULL
    )`);
  }

  async create(curriculum: Curriculum): Promise<Curriculum> {
    const db = await this.dbPromise;
    const now = new Date().toISOString();
    const result = await db.run(
      'INSERT INTO curriculums (fullName, content, createdAt, version) VALUES (?, ?, ?, ?)',
      curriculum.fullName, curriculum.content, now, 1
    );
    return { ...curriculum, id: result.lastID, createdAt: now, version: 1 };
  }

  async getById(id: number): Promise<Curriculum | null> {
    const db = await this.dbPromise;
    const row = await db.get('SELECT * FROM curriculums WHERE id = ?', id);
    return row || null;
  }

  async update(id: number, curriculum: Curriculum): Promise<Curriculum | null> {
    const db = await this.dbPromise;
    const curr = await this.getById(id);
    if (!curr) return null;
    const newVersion = curr.version + 1;
    await db.run(
      'UPDATE curriculums SET fullName = ?, content = ?, version = ? WHERE id = ?',
      curriculum.fullName, curriculum.content, newVersion, id
    );
    return { ...curriculum, id, createdAt: curr.createdAt, version: newVersion };
  }

  async delete(id: number): Promise<boolean> {
    const db = await this.dbPromise;
    const result = await db.run('DELETE FROM curriculums WHERE id = ?', id);
    return (typeof result.changes === 'number') ? result.changes > 0 : false;
  }
}
