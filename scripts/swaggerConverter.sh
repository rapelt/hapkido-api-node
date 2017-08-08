#!/usr/bin/env bash

INFILE=swagger-dev.yaml

echo $INFILE


function convertSwagger(){

    OUTFILE=$1

    cat $INFILE |

    sed "s/tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/$2/" |

    sed 's/basePath: "\/dev"/basePath: "\/'$3'"/' |

    sed 's/title: "Hapkido API"/title: "Hapkido API '$4'"/' |

    sed "s/function:hapkidoApi\/invocations/function:hapkidoApi$4\/invocations/" > $OUTFILE
}

convertSwagger swagger-staging.yaml bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com staging Staging

convertSwagger swagger-prod.yaml cvw4yxgmn1.execute-api.ap-southeast-2.amazonaws.com prod Prod

