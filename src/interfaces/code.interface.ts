export interface discountCode {
  id:           string,
  code:         string,
  description?: string | null,
  discount:     number | any,
  expiresAt?:   Date | null,
  createdAt:    Date,
  updatedAt:    Date,
  isActive:     boolean,
  usageLimit?:  number | null,
  usageCount:   number,

}