import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import { selectTrackedOrderData, selectTrackedOrderError, trackedOrderData, trackedOrderError } from "../../Features/trackOrder/trackOrderSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function DeliveryTimeline() {

  const trackedOrderFailed = useSelector(selectTrackedOrderError);
  const trackedOrderSuccess = useSelector(selectTrackedOrderData);

  const readable_date_object = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const formatdate_createdAt = new Date(trackedOrderSuccess?.createdAt).toLocaleString('en-US', readable_date_object);
  const formatdate_updatedAt = new Date(trackedOrderSuccess?.updatedAt).toLocaleString('en-US', readable_date_object);


  // **** render **
  const renderTimelineItem = (text, level, statusIcon, color) => (
    <TimelineItem className="h-28">
      {
        level === 5 || level === 0 ? '' : <TimelineConnector className="!w-[78px]" />
      }
      {/* {level !== 0 && <TimelineConnector className="!w-[78px]" />} */}
      <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
        <TimelineIcon className="p-3" variant="ghost" color={color}>
          {statusIcon}
        </TimelineIcon>
        <div className="flex flex-col gap-1">
          <Typography variant="h6" color={color} style={{ opacity: "0.6" }}>
            Your order is {text}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {formatdate_updatedAt}
          </Typography>
        </div>
      </TimelineHeader>
    </TimelineItem>
  );

  // render the TimeLineItem according to the current delivery status
  const switchOrderStatus = (orderStatus) => {
    switch (orderStatus) {
      case 'pending':
        return {
          text: "pending",
          level: 1,
          statusIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
          ,
          color: "purple"
        };
      case 'accepted':
        return {
          text: "being packed",
          level: 2,
          statusIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>

          ,
          color: "blue",
        };
      case 'dispatched':
        return {
          text: "dispatched",
          level: 3,
          statusIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
          </svg>
          ,
          color: "orange",
        };
      case 'onTheWay':
        return {
          text: "on the way",
          level: 4,
          statusIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          ,
          color: "red",
        };
      case 'delivered':
        return {
          text: "delivered",
          level: 5,
          statusIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          ,
          color: "green",
        };
      case 'cancelled':
        return {
          text: "cancelled",
          level: 0,
          statusIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ,
          color: "red",
        };
      default:
        return {
          text: "pending",
          statusIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
          ,
          color: "purple"
        };
    }
  };


  const { text, level, statusIcon, color } = switchOrderStatus(trackedOrderSuccess?.status);

  const generateTimelineItems = () => {
    const statuses = ['pending', 'accepted', 'dispatched', 'onTheWay', 'delivered', 'cancelled'];
    const currentStatusIndex = statuses.indexOf(trackedOrderSuccess?.status);

    if (currentStatusIndex === -1) {
      return [];
    }

    if(currentStatusIndex == 5){
      return renderTimelineItem(text, level, statusIcon, color)
    }

    return statuses.slice(0, currentStatusIndex + 1).map((status, index) => {
      const { text, level, statusIcon, color } = switchOrderStatus(status);
      return (
        <AttentionSeeker key={index} effect="shake">
          {renderTimelineItem(text, level, statusIcon, color)}
        </AttentionSeeker>
      );
    });
  };

 

  return (
    <>
      {trackedOrderSuccess && (
        <Fade delay={1000} triggerOnce={true}>
          <div className="track-orderDetail flex mt-10 py-10 px-5 border rounded shadow-xl">

            <Link to={`/products/${trackedOrderSuccess.id}`}><img className="w-32" src={trackedOrderSuccess.currentBuyNowProduct.thumbnail} alt={trackedOrderSuccess.currentBuyNowProduct.title} /></Link>

            <div className="flex flex-col ml-6 mr-4 text-sm md:text-lg">
              <Link to={`/products/${trackedOrderSuccess.id}`}><span className="title">{trackedOrderSuccess.currentBuyNowProduct.title} </span> </Link>
              <span className="brand">{trackedOrderSuccess.currentBuyNowProduct.brand}</span>
              <div className="flex mt-2 text-sm" >
                <p className=""><span className="bold">Size</span>:  {trackedOrderSuccess.currentBuyNowProduct.selectedSize}</p>
                <p className="ml-4"><span className="bold">Quantity</span>: {trackedOrderSuccess.currentBuyNowProduct.quantity}</p>
              </div>
              <p className="text-sm mt-2 "><span className="text-blue-400">Amount: </span> ₹{trackedOrderSuccess.totalAmount}</p>
              <p className="text-sm mt-2"><span className="text-orange-400">Ordered On: </span> {formatdate_createdAt}</p>
            </div>

          </div>
        </Fade>
      )
      }


      <div className="deliveryTimeline grid place-items-center mt-10">
        <div className="md:w-[25rem] ">

          {/* ### if level is 0 i.e. cancelled just display the single TimeLineItem which is 'cancelled' */}
          {/* ### if level is non zero then display the TimeLineItems according to that level of delivery satus*/}
          <Timeline>
            {trackedOrderFailed ? (
              <div className="mt-8 text-red-400">{trackedOrderFailed.error}</div>
            ) : trackedOrderSuccess ? (

              <Timeline>{generateTimelineItems()}</Timeline>
            ) : null}
          </Timeline>

        </div>
      </div>
    </>
  );
}