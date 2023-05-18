import progress from '../../imagess/progress.gif'

function PaymentLoading() {
    return (
        <div>
            <figure>
                <img src={progress} style={{
                    height: '10%',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '18%',
                    width: '10%'
                }} />
                <figcaption className="text-center fw-bolder">You are being redirected to ecommerce platform....</figcaption>
            </figure>
        </div>

    );
}

export default PaymentLoading;