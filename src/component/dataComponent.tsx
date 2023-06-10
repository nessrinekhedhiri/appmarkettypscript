import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationOptions } from 'react-bootstrap-table2-paginator';
import { Form, FormGroup, Label, Button, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Options, columnsTrades, columnsTicker, customStyles, customTotal } from '../constant/constant';

interface CurrencyOption {
  value: string;
  label: string;
}

interface TickerData {
  [key: string]: any;
}

interface TradeData {
  [key: string]: any;
}

const MarketDataComponent: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string>('');
  const [currencyOption, setCurrencyOption] = useState<CurrencyOption[]>([]);
  const [tickerData, setTickerData] = useState<TickerData | null>(null);
  const [tradesData, setTrades] = useState<TradeData[]>([]);
  const [sortedTradesData, setSortedTrades] = useState<TradeData[]>([]);
  const [sortOption, setSortOption] = useState<string>('');

  useEffect(() => {
    axios
      .get('https://api.binance.com/api/v3/exchangeInfo')
      .then((response) => {
        setCurrencyOption(
          response.data.symbols.map((info: { symbol: string }) => {
            return { value: info.symbol, label: info.symbol };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedPair}`)
      .then((response) => {
        setTickerData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    axios
      .get(`https://api.binance.com/api/v3/trades?symbol=${selectedPair}`)
      .then((response) => {
        setTrades(response.data);
        setSortedTrades(response.data.slice());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderNoDataIndication = () => {
    return <div>No data available</div>;
  };

  const handleSortOptionChange = (selectedOption: string) => {
    setSortOption(selectedOption);
    switch (selectedOption) {
      case 'time':
        setSortedTrades([...tradesData].sort((a, b) => a.time - b.time));
        break;
      case 'price':
        setSortedTrades([...tradesData].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
        break;
      case 'quantity':
        setSortedTrades([...tradesData].sort((a, b) => parseFloat(a.qty) - parseFloat(b.qty)));
        break;
      default:
        setSortedTrades([...tradesData]);
        break;
    }
  };

  const options: PaginationOptions = {
    paginationSize: 4,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: 'All',
        value: sortedTradesData.length,
      },
    ],
  };

  return (
    <Card className="p-3">
      <CardHeader className="cartHeader">Market Data</CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label for="currencyPair">Currency Pair:</Label>
                <Select
                  id="currencyPair"
                  value={currencyOption.find((option) => option.value === selectedPair)}
                  options={currencyOption}
                  onChange={(newValue, { action }) => {
                    if (action === 'select-option') {
                      setSelectedPair(newValue.value);
                    }
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm={6} className="selectOption">
              <Button type="submit" onClick={onSubmit}>
                Retrieve Market Data
              </Button>
            </Col>
          </Row>
        </Form>

        {tickerData && (
          <>
            <Label for="ticker" className="pt-3">
              Ticker Data:
            </Label>
            <BootstrapTable
              keyField="symbol"
              data={Array.of(tickerData)}
              columns={columnsTicker}
              noDataIndication={renderNoDataIndication()}
            />
          </>
        )}

        {tradesData.length > 0 && (
          <div>
            <Row className="pt-3">
              <Col sm={6} className="labelTrades">
                <Label for="trades">Trades Data:</Label>
              </Col>
              <Col sm={6} className="selectOption">
                <Label for="sortOption" className="mr-2">
                  Sort by:
                </Label>
                <Select
                  styles={customStyles}
                  id="sortOption"
                  value={Options.find((option) => option.value === sortOption)}
                  options={Options}
                  onChange={(newValue, { action }) => {
                    if (action === 'select-option') {
                      handleSortOptionChange(newValue.value);
                    }
                  }}
                />
              </Col>
            </Row>
            <BootstrapTable
              keyField="id"
              data={sortedTradesData}
              columns={columnsTrades}
              noDataIndication="Table is Empty"
              pagination={paginationFactory(options)}
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default MarketDataComponent;