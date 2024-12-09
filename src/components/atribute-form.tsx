import React from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormValues } from "../pages/create-sub-category/create-subcategory";

interface CreateFormProps {
  onFininsh: (data: any) => void;
  initialValues?: FormValues;
  isEdit?: boolean;
}

const AtributeForm: React.FC<CreateFormProps> = ({
  onFininsh,
  initialValues,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const formProps = isEdit ? { initialValues } : {};
  console.log(initialValues, "formProps");

  return (
    <div style={{ padding: 20, borderRadius: 8 }}>
      <Form
        initialValues={initialValues}
        onFinish={onFininsh}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="vertical"
        form={form}
        name="dynamic_form_complex"
        style={{ width: "100%" }}
        autoComplete="off"
      >
        <Form.List name="attr_list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 16, width: "100%" }}
                  align="baseline"
                >
                  <Card
                    title={`Item ${name + 1}`}
                    size="default"
                    key={key}
                    extra={<MinusCircleOutlined onClick={() => remove(name)} />}
                    style={{
                      width: "100%",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease-in-out",
                      fontSize: 18,
                      padding: 20,
                    }}
                  >
                    <Form.Item
                      label="Title"
                      name={[name, "title"]}
                      {...restField}
                      rules={[{ required: true, message: "Missing title" }]}
                      style={{ width: "600px" }}
                    >
                      <Input style={{ fontSize: 16, padding: "6px 16px" }} />
                    </Form.Item>

                    <Form.Item label="Values" style={{ width: "100%" }}>
                      <Form.List name={[name, "values"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 20,
                              width: "100%",
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space
                                key={subField.key}
                                style={{ width: "100%" }}
                              >
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "value"]}
                                  style={{ width: "100%" }}
                                >
                                  <Input
                                    placeholder="value"
                                    style={{
                                      fontSize: 16,
                                      padding: "6px 16px",
                                    }}
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                              style={{ fontSize: 16, padding: "10px 16px" }}
                            >
                              + Add Sub Item
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ fontSize: 16, padding: "18px 16px", width: "100%" }}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button
            style={{
              color: "blue",
              fontSize: 16,
              padding: "18px 16px",
              width: "100%",
            }}
            type="dashed"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AtributeForm;
