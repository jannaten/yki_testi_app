import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { translationInputReset } from '../../redux/slices';
import { handleEnableKeyEditing } from '../../redux/slices';
import { closeModal, editKeyValues } from '../../redux/slices';
import { handleKeyValueChange, onKeyValueChange } from '../../redux/slices';
import { Button, Form, Modal, Row, Col, InputGroup } from 'react-bootstrap';

function LocalizationEditModal({ translation }) {
  const dispatch = useDispatch();
  const { locale_values } = translation;

  const { enableKeyEditing, keyValueChangeInputValue, languages } = useSelector(
    ({ localization }) => localization
  );

  useEffect(() => {
    dispatch(handleKeyValueChange(translation));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal.Header
        closeButton
        onClick={() => {
          dispatch(translationInputReset());
        }}>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit translations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group style={{ width: '100%' }}>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Form.Label>translation key</Form.Label>
              <InputGroup className='mb-3'>
                <InputGroup.Checkbox
                  aria-label='Checkbox for following text input'
                  onClick={() => dispatch(handleEnableKeyEditing())}
                />
                <Form.Control
                  aria-label='Text input with checkbox'
                  disabled={!enableKeyEditing}
                  name='key'
                  type='text'
                  defaultValue={keyValueChangeInputValue.key}
                  onChange={(e) =>
                    dispatch(
                      onKeyValueChange({
                        eventValue: e.target.value,
                        isKey: true
                      })
                    )
                  }
                />
              </InputGroup>
              {languages.length > 0 &&
                languages.map((locale) => (
                  <React.Fragment key={locale._id}>
                    {locale_values.length &&
                      locale_values.map((value, index) => (
                        <React.Fragment key={index}>
                          {locale.locale === value.language.locale && (
                            <>
                              <Form.Label className='mt-2'>
                                {locale.locale} ({locale.name})
                              </Form.Label>
                              <Form.Control
                                type='text'
                                name={locale.locale}
                                defaultValue={value.name}
                                onChange={(e) =>
                                  dispatch(
                                    onKeyValueChange({
                                      eventValue: e.target.value,
                                      isKey: false,
                                      locale
                                    })
                                  )
                                }
                                placeholder={`${locale.name} translation goes`}
                              />
                            </>
                          )}
                        </React.Fragment>
                      ))}
                  </React.Fragment>
                ))}
            </Col>
          </Row>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant=''
          onClick={() => {
            dispatch(translationInputReset());
            dispatch(closeModal());
          }}
          style={{ border: '0.1rem solid #9967CE', color: '#9967CE' }}>
          close
        </Button>
        <Button
          variant=''
          style={{ color: 'white', backgroundColor: '#9967CE' }}
          onClick={async () => {
            const modifiedData = JSON.parse(
              JSON.stringify(keyValueChangeInputValue)
            );
            modifiedData.locale_values.map((el) => {
              el.language = el.language._id;
              return el;
            });
            const { payload } = await dispatch(editKeyValues(modifiedData));
            dispatch(translationInputReset());
            if (payload) dispatch(closeModal());
          }}>
          update
        </Button>
      </Modal.Footer>
    </>
  );
}

export default LocalizationEditModal;
