#!/usr/bin/env bash

INFILE=swagger-dev.yaml
OUTFILE=swagger-test.yaml

echo $INFILE

cat $INFILE |

sed "s/tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/" |

sed 's/basePath: "\/dev"/basePath: "\/staging"/' |

sed 's/title: "Hapkido API"/title: "Hapkido API Staging"/' |

sed 's/function:hapkidoApi\/invocations/function:hapkidoApiStaging\/invocations/' > $OUTFILE


