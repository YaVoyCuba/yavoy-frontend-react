import { TailSpin } from "react-loader-spinner";

export function Loading() {
  return (
    <>
      <div className="grid h-screen place-items-center">
        
        <TailSpin
          height="80"
          width="80"
          color="#e25328"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
