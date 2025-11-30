// backend/models/referral.js
export class Referral {
  constructor(id, lead_id, message, created_at = new Date()) {
    this.id = id;
    this.lead_id = lead_id;
    this.message = message;
    this.created_at = created_at;
  }
}
