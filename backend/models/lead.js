// backend/models/lead.js
export class Lead {
  constructor(id, name, email, phone, property, score = 0, status = 'new', owner_id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.property = property;
    this.score = score;
    this.status = status;
    this.owner_id = owner_id;
  }
}
