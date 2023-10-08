export interface Baiviet
{
    id: string;
    pid: string;
    Title?: string | null;
    Mota?: string | null;
    Slug?: string | null;
    Baiviet?: string | null;
    Noidung: string[];
    Hinhanh?: {
        hinhchinh?: {}
    };
    Theme:number;
    Loaibaiviet:number;
    KeywordSeo?: string | null;
    RobotsSeo?: string | null;
    Tinhtrang: number,
    Ordering: number,
    Trangthai: number,
    CreateAt: Date,
    idTao?: string | null;

}
