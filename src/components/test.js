try {
  const response = await fetch(
    `https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=9201.T-JP&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1`
  );

  const json = await response.json();

  console.log(json.FormattedQuoteResult.FormattedQuote);
} catch (e) {
  console.error(e);
}
