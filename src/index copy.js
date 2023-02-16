import React, { useState, useMemo, useEffect } from 'react';
import CommonPopover from '../../common/CommonPopover';
import ComboBox from '../../common/ComboBox';
import styled from 'styled-components';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';

const Wrapper = styled.div`
  width: 650px;
  min-height: 165px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
`;

const IconWrapper = styled.div`
  align-items: center;
  border: 1px solid #000;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  margin-left: auto;
  width: 30px;
  color: #888;
  &:hover {
    color: #000;
    border-color: #000;
  }
`;

const AddButton = styled.button`
  all: unset;
  color: white;
  cursor: pointer;
  border-radius: 2px;
  font-size: 12px;
  line-height: 14px;
  padding: 4px 5px;
  background: #707070;
  display: flex;
  align-items: center;
  svg {
    font-size: 12px;
  }
  &::disabled {
    background: #cecece;
    cursor: not-allowed;
  }
`;

const options = [
  {
    title: 'Shipper',
    value: 'Shipper',
  },
  {
    title: 'Consignee',
    value: 'Consignee',
  },
  {
    title: 'Agent',
    value: 'Agent',
  },
  {
    title: 'Carrier',
    value: 'Carrier',
  },
];

const Index = () => {
  return (
    <CommonPopover label={'Origination'}>
      <Origin />
    </CommonPopover>
  );
};

export default Index;

const Origin = () => {
  const [selectDataArr, setSelectDataArr] = useState([
    { id: Math.random(), name: '' },
  ]);
  const [filterOptions, setFilerOptions] = useState(options);

  useEffect(() => {
    const newOption = options.filter(
      ({ title }) => !selectDataArr.map(({ name }) => name).includes(title)
    );
    setFilerOptions(newOption);
  }, [selectDataArr]);

  const handleAdd = () => {
    if (selectDataArr.length === options.length) {
      return;
    }
    setSelectDataArr(selectDataArr.concat({ id: Math.random(), name: '' }));
  };
  const handleClose = (targetId) => {
    if (selectDataArr.length === 1) {
      return;
    }
    setSelectDataArr((prev) => prev.filter(({ id }) => id !== targetId));
  };
  const handleNameChange = (name, idx) => {
    selectDataArr[idx].name = name;
    setSelectDataArr(selectDataArr);
    if (selectDataArr.length === options.length) {
      setFilerOptions([]);
      return;
    }
    const newOption = options.filter(
      ({ title }) => !selectDataArr.map(({ name }) => name).includes(title)
    );
    setFilerOptions(newOption);
  };

  return (
    <Wrapper>
      {selectDataArr.map((item, idx) => (
        <ItemWrapper key={item.id}>
          {' '}
          <ComboBox
            placeholder={'Select...'}
            options={filterOptions}
            width={225}
            index={idx}
            item={item}
            defaultValue={item.name ?? ''}
            id={`single-select${idx}`}
            onChange={handleNameChange}
          />{' '}
          <ComboBox
            placeholder={'Select...'}
            options={options}
            defaultValue={[]}
            width={326}
            multiple
            id={`multiselect-${idx}`}
            index={idx}
          />
          {/* {JSON.stringify(item)} */}
          <IconWrapper>
            <DeleteOutlineIcon
              onClick={() => {
                handleClose(item.id);
              }}
              style={{ fontSize: 20 }}
            />
          </IconWrapper>
        </ItemWrapper>
      ))}
      <AddButton
        onClick={handleAdd}
        disabled={selectDataArr.length === options.length}
      >
        <AddIcon /> <span>Add</span>
      </AddButton>
    </Wrapper>
  );
};
