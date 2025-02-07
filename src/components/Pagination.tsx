import { Pagination as MUIPagination } from '@mui/material';

export const Pagination = ({ count, page, onChange } : any) => {
  return (
    <div className="flex justify-center mt-8">
      <MUIPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        size="large"
      />
    </div>
  );
};