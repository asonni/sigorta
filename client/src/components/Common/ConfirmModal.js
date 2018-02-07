import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = props => {
  const {
    children,
    title,
    show,
    alertStyle,
    onAccept,
    onDecline,
    loading,
    lng
  } = props;
  return (
    <div>
      <Modal show={show} onHide={onDecline}>
        <Header closeButton>
          <Title>{title}</Title>
        </Header>
        <Body>
          <Alert bsStyle={alertStyle}>{children}</Alert>
        </Body>
        <Footer>
          <LaddaButton
            type="button"
            className={`btn btn-${alertStyle}`}
            loading={loading}
            data-color="#337ab7"
            data-style={ZOOM_IN}
            data-spinner-lines={12}
            onClick={onAccept}
          >
            <i className="fa fa-check-circle" aria-hidden="true" />&nbsp;{i18n.t(
              'yes.label',
              { lng }
            )}
          </LaddaButton>
          <Button onClick={onDecline}>
            <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;{i18n.t(
              'no.label',
              { lng }
            )}
          </Button>
        </Footer>
      </Modal>
    </div>
  );
};

export { ConfirmModal };
