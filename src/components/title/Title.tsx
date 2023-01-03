import { BikeWhiteIcon } from '../icons/bike-white';

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <div
      style={{
        height: '72px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {collapsed ? (
        <BikeWhiteIcon style={{ color: 'white', fontSize: '32px' }} />
      ) : (
        <img src="/images/fine-foods.svg" alt="Finefood" />
      )}
    </div>
  );
};
