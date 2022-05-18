import {Button, Card, Empty} from "antd";
import {useSelector} from "react-redux";
import QueueAnim from "rc-queue-anim";

const PhoneList = ({deletePhoneNumber}) => {
    const list = useSelector((state) => state.app.list)
    const phoneNumbers = list.map((l) => {
        return (
            <Card style={{textAlign:"left", minWidth:"400px",width:"60vw", margin:"20px 0"}}
                  key={l.id}
                  title={"№: " + l.id + "    " + l.phoneNumber}
                  extra={<Button type={"danger"} onClick={() => deletePhoneNumber(l.id)}>
                      delete
                  </Button>}>
                <p>phone number: {l.phoneNumber}</p>
                <p>id in database: {l.id}</p>
            </Card>)
    })

    return <div className={"phone-list"}>
        {phoneNumbers.length===0
            ? <Empty style={{marginTop:"40px"}}/>
            : <QueueAnim>{phoneNumbers}</QueueAnim>}
    </div>
}

export default PhoneList;