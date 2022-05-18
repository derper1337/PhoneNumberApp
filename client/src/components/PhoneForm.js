import {useState} from "react";
import {Button, Form, Input, Select, message} from "antd";
import {useSelector} from "react-redux";

const PhoneForm = ({addPhoneNumber, getRegionCodes}) => {
    const regionCode = useSelector((state) => state.app.regions);
    const [value, setValue] = useState("");
    const [region, setRegion] = useState(regionCode[0].code);

    const {Option} = Select;
    const [form] = Form.useForm();

    const regionList = regionCode.map(c => {
        return <Option key={regionCode.indexOf(c, 0)} value={c.code}>
            {c.name} + {c.code}
        </Option>
    })

    return <>
        <div className={"phone-form"}>
            <Form size={"large"} layout={"inline"} style={{padding: "20px"}} form={form}
                  onFinishFailed={() => {
                      message.error('Submission failed');
                  }}
                  onFinish={() => {
                      message.success('Done!');
                      addPhoneNumber(region, value);
                      form.resetFields();
                  }}>

                <div>
                    <Select onClick={getRegionCodes}
                            value={region}
                            style={{width: "10vw", minWidth: "120px"}}
                            onChange={(value) => {
                                setRegion(value);
                            }}>
                        {regionList}
                    </Select>
                </div>
                <Form.Item
                    name={`phone number`}
                    rules={[
                        {min: 3, max: 10, message: "must be 3 to 10 numbers"},
                        {required: true, message: "enter phone number, please"},
                        {pattern: new RegExp(/^[0-9\b]+$/), message: "wrong format"}
                    ]}
                >
                    <Input placeholder={"enter phone number"} style={{width: "30vw", minWidth: "200px"}} type={"number"}
                           value={value}
                           onWheel={(e) => e.target.blur()}
                           onKeyDown={
                               (e) => (e.key === 'e' || e.key === '.' || e.key === ',' || e.key === 'E' || e.key === '+' || e.key === '-') && e.preventDefault()}
                           onChange={(e) => setValue(e.target.value)}/>
                </Form.Item>
                <Button type={"primary"} htmlType={"submit"}>
                    submit
                </Button>
            </Form>
        </div>
    </>
}

export default PhoneForm;