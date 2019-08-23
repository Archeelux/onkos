#!/usr/bin/env node

"use strict";

require("dotenv").config({ path: `${__dirname.replace("\\bin", "\\.env")}` });

console.log("works");
