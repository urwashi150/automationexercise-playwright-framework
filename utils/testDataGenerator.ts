/**
 * Lightweight test data generator - no external faker dependency needed.
 * Keeps the framework dependency footprint small while still producing
 * unique data per run (important for signup flows where email must be unique).
 */
export class TestDataGenerator {
  static randomEmail(prefix = 'qauser'): string {
    const stamp = Date.now();
    const rand = Math.floor(Math.random() * 10000);
    return `${prefix}${stamp}${rand}@example.com`;
  }

  static randomName(): string {
    const first = ['Aarav', 'Priya', 'Rohan', 'Sneha', 'Kabir', 'Isha'];
    const last = ['Sharma', 'Verma', 'Patel', 'Iyer', 'Nair', 'Gupta'];
    return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
  }

  static randomMobile(): string {
    return `9${Math.floor(100000000 + Math.random() * 899999999)}`;
  }

  static randomZip(): string {
    return String(Math.floor(100000 + Math.random() * 899999));
  }

  static strongPassword(): string {
    return `Qa@${Date.now()}`;
  }
}
