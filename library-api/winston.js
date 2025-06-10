const { createLogger, transports, format } = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: 'http://localhost:9200', // Elasticsearch из Docker
  },
};

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new Elasticsearch.ElasticsearchTransport(esTransportOpts)
  ],
});

module.exports = logger;
