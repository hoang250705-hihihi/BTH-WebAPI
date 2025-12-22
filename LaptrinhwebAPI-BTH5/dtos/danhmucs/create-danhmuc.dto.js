export class CreateDanhMucDTO {
  constructor({ MaDanhMuc, TenDanhMuc }) {
    this.MaDanhMuc = MaDanhMuc;
    this.TenDanhMuc = TenDanhMuc;
  }
}