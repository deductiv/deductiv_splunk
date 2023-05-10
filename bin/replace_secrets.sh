#!/bin/bash

# Decrypt secrets in-place to prepare for new splunk.secret file

function sedeasy {
  sed -i "s/$(echo $1 | sed -e 's/\([[\/.*]\|\]\)/\\&/g')/$(echo $2 | sed -e 's/[\/&]/\\&/g')/g" $3
}

find /opt/splunk/etc -name '*.conf' -exec grep -inH '\$[0-9]\$' {} \; > ~/splunksecrets.txt

cat ~/splunksecrets.txt | while read line || [[ -n $line ]]; do
  CONFIG_FILE=`echo $line | sed 's/:.*//'`
  SECRET=`echo $line | sed 's/^.*= //'`
  SECRET_DECRYPTED=`$SPLUNK_HOME/bin/splunk show-decrypted --value "$SECRET"`
  if [[ "z$SECRET_DECRYPTED" != "z" ]]; then
    sedeasy "$SECRET" "$SECRET_DECRYPTED" $CONFIG_FILE
  fi
done
