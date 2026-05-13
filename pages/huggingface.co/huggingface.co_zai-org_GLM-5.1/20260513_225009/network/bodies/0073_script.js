import{n as e}from"./chunk-BKBlUVio.js";import{d as t}from"./esm-DVjRNZav.js";import{t as n}from"./dist-C_XDEaQ-.js";var r=[`python`,`js`,`sh`],i=`https://huggingface.co`,a=`https://router.huggingface.co`,o=`${a}/v1`,s=`X-HF-Bill-To`,c={baseten:{},"black-forest-labs":{},cerebras:{},clarifai:{},cohere:{},deepinfra:{},"fal-ai":{},"featherless-ai":{},"fireworks-ai":{},groq:{},"hf-inference":{},hyperbolic:{},nebius:{},novita:{},nscale:{},nvidia:{},openai:{},publicai:{},ovhcloud:{},replicate:{},sambanova:{},scaleway:{},together:{},wavespeed:{},"zai-org":{}},l=class extends Error{constructor(e){super(e),this.name=`InferenceClientError`}},u=class extends l{constructor(e){super(e),this.name=`InputError`}},d=class extends l{constructor(e){super(e),this.name=`RoutingError`}},f=class extends l{httpRequest;httpResponse;constructor(e,t,n){super(e),this.httpRequest={...t,...t.headers?{headers:{...t.headers,...`Authorization`in t.headers?{Authorization:`Bearer [redacted]`}:void 0}}:void 0},this.httpResponse=n}},p=class extends f{constructor(e,t,n){super(e,t,n),this.name=`ProviderApiError`}},m=class extends f{constructor(e,t,n){super(e,t,n),this.name=`HubApiError`}},h=class extends l{constructor(e){super(e),this.name=`ProviderOutputError`}};function g(e){return Array.isArray(e)?e:[e]}var _=class{provider;baseUrl;clientSideRoutingOnly;constructor(e,t,n=!1){this.provider=e,this.baseUrl=t,this.clientSideRoutingOnly=n}makeBaseUrl(e){return e.authMethod===`provider-key`?this.baseUrl:`${a}/${this.provider}`}makeBody(e){return`data`in e.args&&e.args.data?e.args.data:JSON.stringify(this.preparePayload(e))}makeUrl(e){let t=this.makeBaseUrl(e),n=this.makeRoute(e).replace(/^\/+/,``);return e.urlTransform?e.urlTransform(`${t}/${n}`):`${t}/${n}`}prepareHeaders(e,t){let n={};return e.authMethod!==`none`&&(n.Authorization=`Bearer ${e.accessToken}`),t||(n[`Content-Type`]=`application/json`),n}},v=class extends _{constructor(e,t,n=!1){super(e,t,n)}makeRoute(){return`v1/chat/completions`}preparePayload(e){return{...e.args,model:e.model}}async getResponse(e){if(typeof e==`object`&&Array.isArray(e?.choices)&&typeof e?.created==`number`&&typeof e?.id==`string`&&typeof e?.model==`string`&&(e.system_fingerprint===void 0||e.system_fingerprint===null||typeof e.system_fingerprint==`string`)&&typeof e?.usage==`object`)return e;throw new h(`Expected ChatCompletionOutput`)}},y=class extends _{constructor(e,t,n=!1){super(e,t,n)}preparePayload(e){return{...e.args,model:e.model}}makeRoute(){return`v1/completions`}async getResponse(e){let t=g(e);if(Array.isArray(t)&&t.length>0&&t.every(e=>typeof e==`object`&&!!e&&`generated_text`in e&&typeof e.generated_text==`string`))return t[0];throw new h(`Expected Array<{generated_text: string}>`)}},b=class extends v{constructor(){super(`auto`,`https://router.huggingface.co`)}makeBaseUrl(e){if(e.authMethod!==`hf-token`)throw new d(`Cannot select auto-router when using non-Hugging Face API key.`);return this.baseUrl}};function x(e){if(globalThis.Buffer)return globalThis.Buffer.from(e).toString(`base64`);{let t=[];return e.forEach(e=>{t.push(String.fromCharCode(e))}),globalThis.btoa(t.join(``))}}async function S(e,t=`image/jpeg`){let n=await e.arrayBuffer();return`data:${t};base64,${x(new Uint8Array(n))}`}function ee(e,t){return Object.assign({},...t.map(t=>{if(e[t]!==void 0)return{[t]:e[t]}}))}function C(e,t){return e.includes(t)}function w(e,t){let n=Array.isArray(t)?t:[t];return ee(e,Object.keys(e).filter(e=>!C(n,e)))}var te=[`feature-extraction`,`sentence-similarity`],T=class extends _{constructor(){super(`hf-inference`,`${a}/hf-inference`)}preparePayload(e){return e.args}makeUrl(e){return e.model.startsWith(`http://`)||e.model.startsWith(`https://`)?e.model:super.makeUrl(e)}makeRoute(e){return e.task&&[`feature-extraction`,`sentence-similarity`].includes(e.task)?`models/${e.model}/pipeline/${e.task}`:`models/${e.model}`}async getResponse(e){return e}},ne=class extends T{preparePayload(e){if(e.outputType===`url`)throw new u(`hf-inference provider does not support URL output. Use outputType 'blob', 'dataUrl' or 'json' instead.`);return e.args}async getResponse(e,t,n,r){if(!e)throw new h(`Received malformed response from HF-Inference text-to-image API: response is undefined`);if(typeof e==`object`){if(r===`json`)return{...e};if(`data`in e&&Array.isArray(e.data)&&e.data[0].b64_json){let t=e.data[0].b64_json;return r===`dataUrl`?`data:image/jpeg;base64,${t}`:await(await fetch(`data:image/jpeg;base64,${t}`)).blob()}if(`output`in e&&Array.isArray(e.output)){let t=await(await fetch(e.output[0])).blob();return r===`dataUrl`?S(t):t}}if(e instanceof Blob)return r===`dataUrl`?S(e):r===`json`?{output:await S(e)}:e;throw new h(`Received malformed response from HF-Inference text-to-image API: expected a Blob`)}},re=class extends T{makeUrl(e){let t;return t=e.model.startsWith(`http://`)||e.model.startsWith(`https://`)?e.model.trim():`${this.makeBaseUrl(e)}/models/${e.model}`,t=t.replace(/\/+$/,``),t.endsWith(`/v1`)?t+=`/chat/completions`:t.endsWith(`/chat/completions`)||(t+=`/v1/chat/completions`),t}preparePayload(e){return{...e.args,model:e.model}}async getResponse(e){return e}},ie=class extends T{async getResponse(e){let t=g(e);if(Array.isArray(t)&&t.every(e=>`generated_text`in e&&typeof e?.generated_text==`string`))return t?.[0];throw new h(`Received malformed response from HF-Inference text generation API: expected Array<{generated_text: string}>`)}},ae=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e==`object`&&!!e&&typeof e.label==`string`&&typeof e.score==`number`))return e;throw new h(`Received malformed response from HF-Inference audio-classification API: expected Array<{label: string, score: number}> but received different format`)}},oe=class extends T{async getResponse(e){return e}async preparePayloadAsync(e){return`data`in e?e:{...w(e,`inputs`),data:e.inputs}}},se=class extends T{async getResponse(e){if(!Array.isArray(e))throw new h(`Received malformed response from HF-Inference audio-to-audio API: expected Array`);if(!e.every(e=>typeof e==`object`&&e&&`label`in e&&typeof e.label==`string`&&`content-type`in e&&typeof e[`content-type`]==`string`&&`blob`in e&&typeof e.blob==`string`))throw new h(`Received malformed response from HF-Inference audio-to-audio API: expected Array<{label: string, audio: Blob}>`);return e}},ce=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e==`object`&&!!e&&typeof e?.answer==`string`&&(typeof e.end==`number`||e.end===void 0)&&(typeof e.score==`number`||e.score===void 0)&&(typeof e.start==`number`||e.start===void 0)))return e[0];throw new h(`Received malformed response from HF-Inference document-question-answering API: expected Array<{answer: string, end: number, score: number, start: number}>`)}},le=class extends T{async getResponse(e){let t=(e,n,r=0)=>r>n?!1:e.every(e=>Array.isArray(e))?e.every(e=>t(e,n,r+1)):e.every(e=>typeof e==`number`);if(Array.isArray(e)&&t(e,3,0))return e;throw new h(`Received malformed response from HF-Inference feature-extraction API: expected Array<number[][][] | number[][] | number[] | number>`)}},ue=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e.label==`string`&&typeof e.score==`number`))return e;throw new h(`Received malformed response from HF-Inference image-classification API: expected Array<{label: string, score: number}>`)}},de=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e.label==`string`&&typeof e.mask==`string`&&(e.score===void 0||typeof e.score==`number`)))return e;throw new h(`Received malformed response from HF-Inference image-segmentation API: expected Array<{label: string, mask: string, score: number}>`)}async preparePayloadAsync(e){return{...e,inputs:x(new Uint8Array(e.inputs instanceof ArrayBuffer?e.inputs:await e.inputs.arrayBuffer()))}}},fe=class extends T{async getResponse(e){if(typeof e?.generated_text!=`string`)throw new h(`Received malformed response from HF-Inference image-to-text API: expected {generated_text: string}`);return e}async preparePayloadAsync(e){return`data`in e?e:{...w(e,`inputs`),data:e.inputs}}},pe=class extends T{async preparePayloadAsync(e){return e.parameters?{...e,inputs:x(new Uint8Array(e.inputs instanceof ArrayBuffer?e.inputs:await e.inputs.arrayBuffer()))}:{...e,model:e.model,data:e.inputs}}async getResponse(e){if(e instanceof Blob)return e;throw new h(`Received malformed response from HF-Inference image-to-image API: expected Blob`)}},me=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e.label==`string`&&typeof e.score==`number`&&typeof e.box.xmin==`number`&&typeof e.box.ymin==`number`&&typeof e.box.xmax==`number`&&typeof e.box.ymax==`number`))return e;throw new h(`Received malformed response from HF-Inference object-detection API: expected Array<{label: string, score: number, box: {xmin: number, ymin: number, xmax: number, ymax: number}}>`)}},he=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e.label==`string`&&typeof e.score==`number`))return e;throw new h(`Received malformed response from HF-Inference zero-shot-image-classification API: expected Array<{label: string, score: number}>`)}},ge=class extends T{async getResponse(e){let t=e?.[0];if(Array.isArray(t)&&t.every(e=>typeof e?.label==`string`&&typeof e.score==`number`))return t;throw new h(`Received malformed response from HF-Inference text-classification API: expected Array<{label: string, score: number}>`)}},_e=class extends T{async getResponse(e){if(Array.isArray(e)?e.every(e=>typeof e==`object`&&!!e&&typeof e.answer==`string`&&typeof e.end==`number`&&typeof e.score==`number`&&typeof e.start==`number`):typeof e==`object`&&e&&typeof e.answer==`string`&&typeof e.end==`number`&&typeof e.score==`number`&&typeof e.start==`number`)return Array.isArray(e)?e[0]:e;throw new h(`Received malformed response from HF-Inference question-answering API: expected Array<{answer: string, end: number, score: number, start: number}>`)}},ve=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e.score==`number`&&typeof e.sequence==`string`&&typeof e.token==`number`&&typeof e.token_str==`string`))return e;throw new h(`Received malformed response from HF-Inference fill-mask API: expected Array<{score: number, sequence: string, token: number, token_str: string}>`)}},ye=class e extends T{async getResponse(t){if(typeof t==`object`&&t&&`labels`in t&&`scores`in t&&Array.isArray(t.labels)&&Array.isArray(t.scores)&&t.labels.length===t.scores.length&&t.labels.every(e=>typeof e==`string`)&&t.scores.every(e=>typeof e==`number`)){let e=t.scores;return t.labels.map((t,n)=>({label:t,score:e[n]}))}if(Array.isArray(t)&&t.every(e.validateOutputElement))return t;throw new h(`Received malformed response from HF-Inference zero-shot-classification API: expected Array<{label: string, score: number}>`)}static validateOutputElement(e){return typeof e==`object`&&!!e&&`label`in e&&`score`in e&&typeof e.label==`string`&&typeof e.score==`number`}},be=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e==`number`))return e;throw new h(`Received malformed response from HF-Inference sentence-similarity API: expected Array<number>`)}},xe=class e extends T{static validate(e){return typeof e==`object`&&!!e&&`aggregator`in e&&typeof e.aggregator==`string`&&`answer`in e&&typeof e.answer==`string`&&`cells`in e&&Array.isArray(e.cells)&&e.cells.every(e=>typeof e==`string`)&&`coordinates`in e&&Array.isArray(e.coordinates)&&e.coordinates.every(e=>Array.isArray(e)&&e.every(e=>typeof e==`number`))}async getResponse(t){if(Array.isArray(t)&&Array.isArray(t)?t.every(t=>e.validate(t)):e.validate(t))return Array.isArray(t)?t[0]:t;throw new h(`Received malformed response from HF-Inference table-question-answering API: expected {aggregator: string, answer: string, cells: string[], coordinates: number[][]}`)}},Se=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e.end==`number`&&typeof e.entity_group==`string`&&typeof e.score==`number`&&typeof e.start==`number`&&typeof e.word==`string`))return e;throw new h(`Received malformed response from HF-Inference token-classification API: expected Array<{end: number, entity_group: string, score: number, start: number, word: string}>`)}},Ce=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e?.translation_text==`string`))return e?.length===1?e?.[0]:e;throw new h(`Received malformed response from HF-Inference translation API: expected Array<{translation_text: string}>`)}},we=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e?.summary_text==`string`))return e?.[0];throw new h(`Received malformed response from HF-Inference summarization API: expected Array<{summary_text: string}>`)}},Te=class extends T{async getResponse(e){return e}},Ee=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e==`number`))return e;throw new h(`Received malformed response from HF-Inference tabular-classification API: expected Array<number>`)}},De=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e==`object`&&!!e&&typeof e?.answer==`string`&&typeof e.score==`number`))return e[0];throw new h(`Received malformed response from HF-Inference visual-question-answering API: expected Array<{answer: string, score: number}>`)}},Oe=class extends T{async getResponse(e){if(Array.isArray(e)&&e.every(e=>typeof e==`number`))return e;throw new h(`Received malformed response from HF-Inference tabular-regression API: expected Array<number>`)}},ke=class extends T{async getResponse(e){return e}},Ae=console;function E(){return Ae}var D=new Map;function je(e,t){return t?Array.isArray(t)?t:Object.entries(t).map(([t,n])=>({provider:t,hfModelId:e,providerId:n.providerId,status:n.status,task:n.task,adapter:n.adapter,adapterWeightsPath:n.adapterWeightsPath})):[]}async function Me(e,t,n){let r;if(D.has(e))r=D.get(e);else{let a=`${i}/api/models/${e}?expand[]=inferenceProviderMapping`,o=await(n?.fetch??fetch)(a,{headers:t?.startsWith(`hf_`)?{Authorization:`Bearer ${t}`}:{}});if(!o.ok)if(o.headers.get(`Content-Type`)?.startsWith(`application/json`)){let t=await o.json();if(`error`in t&&typeof t.error==`string`)throw new m(`Failed to fetch inference provider mapping for model ${e}: ${t.error}`,{url:a,method:`GET`},{requestId:o.headers.get(`x-request-id`)??``,status:o.status,body:t})}else throw new m(`Failed to fetch inference provider mapping for model ${e}`,{url:a,method:`GET`},{requestId:o.headers.get(`x-request-id`)??``,status:o.status,body:await o.text()});let s=null;try{s=await o.json()}catch{throw new m(`Failed to fetch inference provider mapping for model ${e}: malformed API response, invalid JSON`,{url:a,method:`GET`},{requestId:o.headers.get(`x-request-id`)??``,status:o.status,body:await o.text()})}if(!s?.inferenceProviderMapping)throw new m(`We have not been able to find inference provider information for model ${e}.`,{url:a,method:`GET`},{requestId:o.headers.get(`x-request-id`)??``,status:o.status,body:await o.text()});r=je(e,s.inferenceProviderMapping),D.set(e,r)}return r}async function Ne(e,t){let n=E();if(e.provider===`auto`&&e.task===`conversational`)return{hfModelId:e.modelId,provider:`auto`,providerId:e.modelId,status:`live`,task:`conversational`};if(c[e.provider][e.modelId])return c[e.provider][e.modelId];let r=(await Me(e.modelId,e.accessToken,t)).find(t=>t.provider===e.provider);if(r){if(!C(e.provider===`hf-inference`&&C(te,e.task)?te:[e.task],r.task))throw new u(`Model ${e.modelId} is not supported for task ${e.task} and provider ${e.provider}. Supported task: ${r.task}.`);return r.status===`staging`&&n.warn(`Model ${e.modelId} is in staging mode for provider ${e.provider}. Meant for test purposes only.`),r}return null}async function O(e,t,n){let r=E();if(n){if(e)throw new u(`Specifying both endpointUrl and provider is not supported.`);return`hf-inference`}if(e||=(r.log(`Defaulting to 'auto' which will select the first provider available for the model, sorted by the user's order in https://hf.co/settings/inference-providers.`),`auto`),e===`auto`){if(!t)throw new u(`Specifying a model is required when provider is 'auto'`);e=(await Me(t))[0]?.provider,r.log(`Auto selected provider:`,e)}if(!e)throw new u(`No Inference Provider available for model ${t}.`);return e}var Pe=`https://inference.baseten.co`,Fe=class extends v{constructor(){super(`baseten`,Pe)}},Ie=`https://api.clarifai.com`,Le=class extends v{constructor(){super(`clarifai`,Ie)}makeRoute(){return`/v2/ext/openai/v1/chat/completions`}prepareHeaders(e,t){let n={Authorization:e.authMethod===`provider-key`?`Key ${e.accessToken}`:`Bearer ${e.accessToken}`};return t||(n[`Content-Type`]=`application/json`),n}};function k(e){return new Promise(t=>{setTimeout(()=>t(),e)})}var Re=`https://api.us1.bfl.ai`,ze=class extends _{constructor(){super(`black-forest-labs`,Re)}preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,prompt:e.args.inputs}}prepareHeaders(e,t){let n={Authorization:e.authMethod===`provider-key`?`X-Key ${e.accessToken}`:`Bearer ${e.accessToken}`};return t||(n[`Content-Type`]=`application/json`),n}makeRoute(e){if(!e)throw new u(`Params are required`);return`/v1/${e.model}`}async getResponse(e,t,n,r){let i=E(),a=new URL(e.polling_url);for(let e=0;e<5;e++){await k(1e3),i.debug(`Polling Black Forest Labs API for the result... ${e+1}/5`),a.searchParams.set(`attempt`,e.toString(10));let t=await fetch(a,{headers:{"Content-Type":`application/json`}});if(!t.ok)throw new p(`Failed to fetch result from black forest labs API`,{url:a.toString(),method:`GET`,headers:{"Content-Type":`application/json`}},{requestId:t.headers.get(`x-request-id`)??``,status:t.status,body:await t.text()});let n=await t.json();if(typeof n==`object`&&n&&`status`in n&&typeof n.status==`string`&&n.status===`Ready`&&`result`in n&&typeof n.result==`object`&&n.result&&`sample`in n.result&&typeof n.result.sample==`string`)return r===`json`?n.result:r===`url`?n.result.sample:await(await fetch(n.result.sample)).blob()}throw new h(`Timed out while waiting for the result from black forest labs API - aborting after 5 attempts`)}},Be=class extends v{constructor(){super(`cerebras`,`https://api.cerebras.ai`)}},Ve=class extends v{constructor(){super(`cohere`,`https://api.cohere.com`)}makeRoute(){return`/compatibility/v1/chat/completions`}},He=`https://api.deepinfra.com`,Ue=class extends v{constructor(){super(`deepinfra`,He)}makeRoute(){return`v1/openai/chat/completions`}},We=class extends y{constructor(){super(`deepinfra`,He)}makeRoute(){return`v1/openai/completions`}preparePayload(e){let t=e.args.parameters;return{model:e.model,prompt:e.args.inputs,...w(e.args,[`inputs`,`parameters`]),...t?{max_tokens:t.max_new_tokens,...w(t,[`max_new_tokens`])}:void 0}}async getResponse(e){if(typeof e==`object`&&e&&Array.isArray(e.choices)&&e.choices.length>0){let t=e.choices[0].text;if(typeof t==`string`)return{generated_text:t}}throw new h(`Received malformed response from DeepInfra text-generation API: expected OpenAI completion payload`)}};function A(e){return/^http(s?):/.test(e)||e.startsWith(`/`)}var Ge=[`audio/mpeg`,`audio/mp4`,`audio/wav`,`audio/x-wav`],j=class extends _{constructor(e){super(`fal-ai`,e||`https://fal.run`)}preparePayload(e){return e.args}makeRoute(e){return`/${e.model}`}prepareHeaders(e,t){let n={Authorization:e.authMethod===`provider-key`?`Key ${e.accessToken}`:`Bearer ${e.accessToken}`};return t||(n[`Content-Type`]=`application/json`),n}},M=class extends j{makeRoute(e){return e.authMethod===`provider-key`?`/${e.model}`:`/${e.model}?_subdomain=queue`}async getResponseFromQueueApi(e,t,n){if(!t||!n)throw new u(`URL and headers are required for ${this.task} task`);if(!e.request_id)throw new h(`Received malformed response from Fal.ai ${this.task} API: no request ID found in the response`);let r=e.status,i=new URL(t),a=`${i.protocol}//${i.host}${i.host===`router.huggingface.co`?`/fal-ai`:``}`,o=new URL(e.response_url).pathname,s=i.search,c=`${a}${o}/status${s}`,l=`${a}${o}${s}`;for(;r!==`COMPLETED`;){await k(500);let e=await fetch(c,{headers:n});if(!e.ok)throw new p(`Failed to fetch response status from fal-ai API`,{url:c,method:`GET`},{requestId:e.headers.get(`x-request-id`)??``,status:e.status,body:await e.text()});try{r=(await e.json()).status}catch{throw new h(`Failed to parse status response from fal-ai API: received malformed response`)}}let d=await fetch(l,{headers:n}),f;try{f=await d.json()}catch{throw new h(`Failed to parse result response from fal-ai API: received malformed response`)}return f}};function Ke(e,t){return`${i}/${e}/resolve/main/${t}`}var qe=class extends M{task;constructor(){super(`https://queue.fal.run`),this.task=`text-to-image`}preparePayload(e){let t={...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,prompt:e.args.inputs};return e.mapping?.adapter===`lora`&&e.mapping.adapterWeightsPath&&(t.loras=[{path:Ke(e.mapping.hfModelId,e.mapping.adapterWeightsPath),scale:1}],e.mapping.providerId===`fal-ai/lora`&&(t.model_name=`stabilityai/stable-diffusion-xl-base-1.0`)),t}async getResponse(e,t,n,r){let i=await this.getResponseFromQueueApi(e,t,n);if(typeof i==`object`&&`images`in i&&Array.isArray(i.images)&&i.images.length>0&&`url`in i.images[0]&&typeof i.images[0].url==`string`&&A(i.images[0].url)){if(r===`json`)return{...i};if(r===`url`)return i.images[0].url;let e=await(await fetch(i.images[0].url)).blob();return r===`dataUrl`?S(e):e}throw new h(`Received malformed response from Fal.ai text-to-image API: expected { images: Array<{ url: string }> } result format, got instead: ${JSON.stringify(i)}`)}},Je=class extends M{task;constructor(){super(`https://queue.fal.run`),this.task=`image-to-image`}preparePayload(e){let t=e.args;return e.mapping?.adapter===`lora`&&e.mapping.adapterWeightsPath&&(t.loras=[{path:Ke(e.mapping.hfModelId,e.mapping.adapterWeightsPath),scale:1}]),t}async preparePayloadAsync(e){let t=`data:${e.inputs instanceof Blob?e.inputs.type:`image/png`};base64,${x(new Uint8Array(e.inputs instanceof ArrayBuffer?e.inputs:await e.inputs.arrayBuffer()))}`;return{...w(e,[`inputs`,`parameters`]),image_url:t,...e.parameters,...e,image_urls:[t]}}async getResponse(e,t,n){let r=await this.getResponseFromQueueApi(e,t,n);if(typeof r==`object`&&r&&`images`in r&&Array.isArray(r.images)&&r.images.length>0&&typeof r.images[0]==`object`&&r.images[0]&&`url`in r.images[0]&&typeof r.images[0].url==`string`&&A(r.images[0].url))return await(await fetch(r.images[0].url)).blob();throw new h(`Received malformed response from Fal.ai image-to-image API: expected { images: Array<{ url: string }> } result format, got instead: ${JSON.stringify(r)}`)}},Ye=class extends Je{constructor(){super(),this.task=`image-text-to-image`}async preparePayloadAsync(e){return e.inputs?super.preparePayloadAsync(e):{...w(e,[`inputs`,`parameters`]),...e.parameters,prompt:e.parameters?.prompt,urlTransform:e=>{let t=new URL(e);return t.pathname=t.pathname.split(`/`).slice(0,-1).join(`/`),t.toString()}}}},Xe=class extends M{task;constructor(){super(`https://queue.fal.run`),this.task=`text-to-video`}preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,prompt:e.args.inputs}}async getResponse(e,t,n){let r=await this.getResponseFromQueueApi(e,t,n);if(typeof r==`object`&&r&&`video`in r&&typeof r.video==`object`&&r.video&&`url`in r.video&&typeof r.video.url==`string`&&A(r.video.url))return await(await fetch(r.video.url)).blob();throw new h(`Received malformed response from Fal.ai text-to-video API: expected { video: { url: string } } result format, got instead: ${JSON.stringify(r)}`)}},Ze=class extends M{task;constructor(){super(`https://queue.fal.run`),this.task=`image-to-video`}preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,image_url:e.args.image_url}}async preparePayloadAsync(e){let t=e.inputs instanceof Blob?e.inputs.type:`image/png`;return{...w(e,[`inputs`,`parameters`]),image_url:`data:${t};base64,${x(new Uint8Array(e.inputs instanceof ArrayBuffer?e.inputs:await e.inputs.arrayBuffer()))}`,...e.parameters,...e}}async getResponse(e,t,n){let r=await this.getResponseFromQueueApi(e,t,n);if(typeof r==`object`&&r&&`video`in r&&typeof r.video==`object`&&r.video!==null&&`url`in r.video&&typeof r.video.url==`string`&&`url`in r.video&&A(r.video.url))return await(await fetch(r.video.url)).blob();throw new h(`Received malformed response from Fal.ai image‑to‑video API: expected { video: { url: string } }, got: ${JSON.stringify(r)}`)}},Qe=class extends Ze{constructor(){super(),this.task=`image-text-to-video`}async preparePayloadAsync(e){return e.inputs?super.preparePayloadAsync(e):{...w(e,[`inputs`,`parameters`]),...e.parameters,prompt:e.parameters?.prompt,urlTransform:e=>{let t=new URL(e);return t.pathname=t.pathname.split(`/`).slice(0,-1).join(`/`),t.toString()}}}},$e=class extends j{prepareHeaders(e,t){let n=super.prepareHeaders(e,t);return n[`Content-Type`]=`application/json`,n}async getResponse(e){let t=e;if(typeof t?.text!=`string`)throw new h(`Received malformed response from Fal.ai Automatic Speech Recognition API: expected { text: string } format, got instead: ${JSON.stringify(e)}`);return{text:t.text}}async preparePayloadAsync(e){let t=`data`in e&&e.data instanceof Blob?e.data:`inputs`in e?e.inputs:void 0,n=t?.type;if(!n)throw new u(`Unable to determine the input's content-type. Make sure your are passing a Blob when using provider fal-ai.`);if(!Ge.includes(n))throw new u(`Provider fal-ai does not support blob type ${n} - supported content types are: ${Ge.join(`, `)}`);let r=x(new Uint8Array(await t.arrayBuffer()));return{...`data`in e?w(e,`data`):w(e,`inputs`),audio_url:`data:${n};base64,${r}`}}},et=class extends j{preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,text:e.args.inputs}}async getResponse(e){let t=e;if(typeof t?.audio?.url!=`string`)throw new h(`Received malformed response from Fal.ai Text-to-Speech API: expected { audio: { url: string } } format, got instead: ${JSON.stringify(e)}`);let n=await fetch(t.audio.url);if(!n.ok)throw new p(`Failed to fetch audio from ${t.audio.url}: ${n.statusText}`,{url:t.audio.url,method:`GET`,headers:{"Content-Type":`application/json`}},{requestId:n.headers.get(`x-request-id`)??``,status:n.status,body:await n.text()});try{return await n.blob()}catch(e){throw new p(`Failed to fetch audio from ${t.audio.url}: ${e instanceof Error?e.message:String(e)}`,{url:t.audio.url,method:`GET`,headers:{"Content-Type":`application/json`}},{requestId:n.headers.get(`x-request-id`)??``,status:n.status,body:await n.text()})}}},tt=class extends M{task;constructor(){super(`https://queue.fal.run`),this.task=`image-segmentation`}preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,sync_mode:!0}}async preparePayloadAsync(e){let t=`data`in e&&e.data instanceof Blob?e.data:`inputs`in e?e.inputs:void 0,n=t instanceof Blob?t.type:`image/png`,r=x(new Uint8Array(t instanceof ArrayBuffer?t:await t.arrayBuffer()));return{...w(e,[`inputs`,`parameters`,`data`]),...e.parameters,...e,image_url:`data:${n};base64,${r}`,sync_mode:!0}}async getResponse(e,t,n){let r=await this.getResponseFromQueueApi(e,t,n);if(typeof r==`object`&&r&&`image`in r&&typeof r.image==`object`&&r.image!==null&&`url`in r.image&&typeof r.image.url==`string`){let e=await fetch(r.image.url);if(!e.ok)throw new p(`Failed to fetch segmentation mask from ${r.image.url}`,{url:r.image.url,method:`GET`},{requestId:e.headers.get(`x-request-id`)??``,status:e.status,body:await e.text()});let t=await(await e.blob()).arrayBuffer();return[{label:`mask`,score:1,mask:x(new Uint8Array(t))}]}throw new h(`Received malformed response from Fal.ai image-segmentation API: expected { image: { url: string } } format, got instead: ${JSON.stringify(e)}`)}},nt=`https://api.featherless.ai`,rt=class extends v{constructor(){super(`featherless-ai`,nt)}},it=class extends y{constructor(){super(`featherless-ai`,nt)}preparePayload(e){return{model:e.model,...w(e.args,[`inputs`,`parameters`]),...e.args.parameters?{max_tokens:e.args.parameters.max_new_tokens,...w(e.args.parameters,`max_new_tokens`)}:void 0,prompt:e.args.inputs}}async getResponse(e){if(typeof e==`object`&&`choices`in e&&Array.isArray(e?.choices)&&typeof e?.model==`string`)return{generated_text:e.choices[0].text};throw new h(`Received malformed response from Featherless AI text generation API`)}},at=class extends v{constructor(){super(`fireworks-ai`,`https://api.fireworks.ai`)}makeRoute(){return`/inference/v1/chat/completions`}},ot=`https://api.groq.com`,st=class extends y{constructor(){super(`groq`,ot)}makeRoute(){return`/openai/v1/chat/completions`}},ct=class extends v{constructor(){super(`groq`,ot)}makeRoute(){return`/openai/v1/chat/completions`}},N=`https://api.hyperbolic.xyz`,lt=class extends v{constructor(){super(`hyperbolic`,N)}},ut=class extends y{constructor(){super(`hyperbolic`,N)}makeRoute(){return`v1/chat/completions`}preparePayload(e){return{messages:[{content:e.args.inputs,role:`user`}],...e.args.parameters?{max_tokens:e.args.parameters.max_new_tokens,...w(e.args.parameters,`max_new_tokens`)}:void 0,...w(e.args,[`inputs`,`parameters`]),model:e.model}}async getResponse(e){if(typeof e==`object`&&`choices`in e&&Array.isArray(e?.choices)&&typeof e?.model==`string`)return{generated_text:e.choices[0].message.content};throw new h(`Received malformed response from Hyperbolic text generation API`)}},dt=class extends _{constructor(){super(`hyperbolic`,N)}makeRoute(e){return`/v1/images/generations`}preparePayload(e){if(e.outputType===`url`)throw new u(`hyperbolic provider does not support URL output. Use outputType 'blob', 'dataUrl' or 'json' instead.`);return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,prompt:e.args.inputs,model_name:e.model}}async getResponse(e,t,n,r){if(typeof e==`object`&&`images`in e&&Array.isArray(e.images)&&e.images[0]&&typeof e.images[0].image==`string`)return r===`json`?{...e}:r===`dataUrl`?`data:image/jpeg;base64,${e.images[0].image}`:fetch(`data:image/jpeg;base64,${e.images[0].image}`).then(e=>e.blob());throw new h(`Received malformed response from Hyperbolic text-to-image API`)}},P=`https://api.studio.nebius.ai`,ft=class extends v{constructor(){super(`nebius`,P)}preparePayload(e){let t=super.preparePayload(e),n=e.args.response_format;return n?.type===`json_schema`&&n.json_schema?.schema&&(t.guided_json=n.json_schema.schema),t}},pt=class extends y{constructor(){super(`nebius`,P)}preparePayload(e){return{...e.args,model:e.model,prompt:e.args.inputs}}async getResponse(e){if(typeof e==`object`&&`choices`in e&&Array.isArray(e?.choices)&&e.choices.length>0&&typeof e.choices[0]?.text==`string`)return{generated_text:e.choices[0].text};throw new h(`Received malformed response from Nebius text generation API`)}},mt=class extends _{constructor(){super(`nebius`,P)}preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,response_format:e.outputType===`url`?`url`:`b64_json`,prompt:e.args.inputs,model:e.model}}makeRoute(){return`v1/images/generations`}async getResponse(e,t,n,r){if(typeof e==`object`&&`data`in e&&Array.isArray(e.data)&&e.data.length>0){if(r===`json`)return{...e};if(`url`in e.data[0]&&typeof e.data[0].url==`string`)return e.data[0].url;if(`b64_json`in e.data[0]&&typeof e.data[0].b64_json==`string`){let t=e.data[0].b64_json;return r===`dataUrl`?`data:image/jpeg;base64,${t}`:fetch(`data:image/jpeg;base64,${t}`).then(e=>e.blob())}}throw new h(`Received malformed response from Nebius text-to-image API`)}},ht=class extends _{constructor(){super(`nebius`,P)}preparePayload(e){return{input:e.args.inputs,model:e.model}}makeRoute(){return`v1/embeddings`}async getResponse(e){return e.data.map(e=>e.embedding)}},F=`https://api.novita.ai`,gt=class extends y{constructor(){super(`novita`,F)}makeRoute(){return`/v3/openai/chat/completions`}},_t=class extends v{constructor(){super(`novita`,F)}makeRoute(){return`/v3/openai/chat/completions`}},vt=class extends _{constructor(){super(`novita`,F)}makeRoute(e){return`/v3/async/${e.model}`}preparePayload(e){let{num_inference_steps:t,...n}=e.args.parameters??{};return{...w(e.args,[`inputs`,`parameters`]),...n,steps:t,prompt:e.args.inputs}}async getResponse(e,t,n){if(!t||!n)throw new u(`URL and headers are required for text-to-video task`);let r=e.task_id;if(!r)throw new h(`Received malformed response from Novita text-to-video API: no task ID found in the response`);let i=new URL(t),a=`${`${i.protocol}//${i.host}${i.host===`router.huggingface.co`?`/novita`:``}`}/v3/async/task-result?task_id=${r}`,o=``,s;for(;o!==`TASK_STATUS_SUCCEED`&&o!==`TASK_STATUS_FAILED`;){await k(500);let e=await fetch(a,{headers:n});if(!e.ok)throw new p(`Failed to fetch task result`,{url:a,method:`GET`,headers:n},{requestId:e.headers.get(`x-request-id`)??``,status:e.status,body:await e.text()});try{if(s=await e.json(),s&&typeof s==`object`&&`task`in s&&s.task&&typeof s.task==`object`&&`status`in s.task&&typeof s.task.status==`string`)o=s.task.status;else throw new h(`Received malformed response from Novita text-to-video API: failed to get task status`)}catch{throw new h(`Received malformed response from Novita text-to-video API: failed to parse task result`)}}if(o===`TASK_STATUS_FAILED`)throw new h(`Novita text-to-video task failed`);if(typeof s==`object`&&s&&`videos`in s&&typeof s.videos==`object`&&s.videos&&Array.isArray(s.videos)&&s.videos.length>0&&`video_url`in s.videos[0]&&typeof s.videos[0].video_url==`string`&&A(s.videos[0].video_url))return await(await fetch(s.videos[0].video_url)).blob();throw new h(`Received malformed response from Novita text-to-video API: expected { videos: [{ video_url: string }] } format, got instead: ${JSON.stringify(s)}`)}},yt=`https://inference.api.nscale.com`,bt=class extends v{constructor(){super(`nscale`,yt)}},xt=class extends _{constructor(){super(`nscale`,yt)}preparePayload(e){if(e.outputType===`url`)throw new u(`nscale provider does not support URL output. Use outputType 'blob', 'dataUrl' or 'json' instead.`);return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,response_format:`b64_json`,prompt:e.args.inputs,model:e.model}}makeRoute(){return`v1/images/generations`}async getResponse(e,t,n,r){if(typeof e==`object`&&`data`in e&&Array.isArray(e.data)&&e.data.length>0&&`b64_json`in e.data[0]&&typeof e.data[0].b64_json==`string`){if(r===`json`)return{...e};let t=e.data[0].b64_json;return r===`dataUrl`?`data:image/jpeg;base64,${t}`:fetch(`data:image/jpeg;base64,${t}`).then(e=>e.blob())}throw new h(`Received malformed response from Nscale text-to-image API`)}},St=class extends v{constructor(){super(`nvidia`,`https://integrate.api.nvidia.com`)}},Ct=`https://api.openai.com`,wt=class extends v{constructor(){super(`openai`,Ct,!0)}},Tt=`https://oai.endpoints.kepler.ai.cloud.ovh.net`,Et=class extends v{constructor(){super(`ovhcloud`,Tt)}},Dt=class extends y{constructor(){super(`ovhcloud`,Tt)}preparePayload(e){return{model:e.model,...w(e.args,[`inputs`,`parameters`]),...e.args.parameters?{max_tokens:e.args.parameters.max_new_tokens,...w(e.args.parameters,`max_new_tokens`)}:void 0,prompt:e.args.inputs}}async getResponse(e){if(typeof e==`object`&&`choices`in e&&Array.isArray(e?.choices)&&typeof e?.model==`string`)return{generated_text:e.choices[0].text};throw new h(`Received malformed response from OVHcloud text generation API`)}},Ot=class extends v{constructor(){super(`publicai`,`https://api.publicai.co`)}},I=class extends _{constructor(e){super(`replicate`,e||`https://api.replicate.com`)}makeRoute(e){return e.model.includes(`:`)?`v1/predictions`:`v1/models/${e.model}/predictions`}preparePayload(e){return{input:{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,prompt:e.args.inputs},version:e.model.includes(`:`)?e.model.split(`:`)[1]:void 0}}prepareHeaders(e,t){let n={Authorization:`Bearer ${e.accessToken}`,Prefer:`wait`};return t||(n[`Content-Type`]=`application/json`),n}makeUrl(e){let t=this.makeBaseUrl(e);return e.model.includes(`:`)?`${t}/v1/predictions`:`${t}/v1/models/${e.model}/predictions`}},kt=class extends I{preparePayload(e){return{input:{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,prompt:e.args.inputs,lora_weights:e.mapping?.adapter===`lora`&&e.mapping.adapterWeightsPath?`https://huggingface.co/${e.mapping.hfModelId}`:void 0},version:e.model.includes(`:`)?e.model.split(`:`)[1]:void 0}}async getResponse(e,t,n,r){if(typeof e==`object`&&`output`in e&&typeof e.output==`string`&&A(e.output)){if(r===`json`)return{...e};if(r===`url`)return e.output;let t=await(await fetch(e.output)).blob();return r===`dataUrl`?S(t):t}if(typeof e==`object`&&`output`in e&&Array.isArray(e.output)&&e.output.length>0&&typeof e.output[0]==`string`){if(r===`json`)return{...e};if(r===`url`)return e.output[0];let t=await(await fetch(e.output[0])).blob();return r===`dataUrl`?S(t):t}throw new h(`Received malformed response from Replicate text-to-image API`)}},At=class extends I{preparePayload(e){let t=super.preparePayload(e),n=t.input;if(typeof n==`object`&&n&&`prompt`in n){let e=n;e.text=e.prompt,delete e.prompt}return t}async getResponse(e){if(e instanceof Blob)return e;if(e&&typeof e==`object`&&`output`in e){if(typeof e.output==`string`)return await(await fetch(e.output)).blob();if(Array.isArray(e.output))return await(await fetch(e.output[0])).blob()}throw new h(`Received malformed response from Replicate text-to-speech API`)}},jt=class extends I{async getResponse(e){if(typeof e==`object`&&e&&`output`in e&&typeof e.output==`string`&&A(e.output))return await(await fetch(e.output)).blob();throw new h(`Received malformed response from Replicate text-to-video API`)}},Mt=class extends I{preparePayload(e){return{input:{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,audio:e.args.inputs},version:e.model.includes(`:`)?e.model.split(`:`)[1]:void 0}}async preparePayloadAsync(e){let t=`data`in e&&e.data instanceof Blob?e.data:`inputs`in e?e.inputs:void 0;if(!t||!(t instanceof Blob))throw Error(`Audio input must be a Blob`);let n=x(new Uint8Array(await t.arrayBuffer())),r=`data:${t.type||`audio/wav`};base64,${n}`;return{...`data`in e?w(e,`data`):w(e,`inputs`),inputs:r}}async getResponse(e){if(typeof e?.output==`string`)return{text:e.output};if(Array.isArray(e?.output)&&typeof e.output[0]==`string`)return{text:e.output[0]};let t=e?.output;if(t&&typeof t==`object`){if(typeof t.transcription==`string`)return{text:t.transcription};if(typeof t.translation==`string`)return{text:t.translation};if(typeof t.txt_file==`string`)return{text:await(await fetch(t.txt_file)).text()}}throw new h(`Received malformed response from Replicate automatic-speech-recognition API`)}},Nt=class extends I{preparePayload(e){let t=e.args.inputs;return{input:{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,image:t,images:[t],input_image:t,input_images:[t],lora_weights:e.mapping?.adapter===`lora`&&e.mapping.adapterWeightsPath?`https://huggingface.co/${e.mapping.hfModelId}`:void 0},version:e.model.includes(`:`)?e.model.split(`:`)[1]:void 0}}async preparePayloadAsync(e){let{inputs:t,...n}=e,r=x(new Uint8Array(await t.arrayBuffer())),i=`data:${t.type||`image/jpeg`};base64,${r}`;return{...n,inputs:i}}async getResponse(e){if(typeof e==`object`&&e&&`output`in e&&Array.isArray(e.output)&&e.output.length>0&&typeof e.output[0]==`string`)return await(await fetch(e.output[0])).blob();if(typeof e==`object`&&e&&`output`in e&&typeof e.output==`string`&&A(e.output))return await(await fetch(e.output)).blob();throw new h(`Received malformed response from Replicate image-to-image API`)}},Pt=class extends v{constructor(){super(`sambanova`,`https://api.sambanova.ai`)}preparePayload(e){let t=e.args.response_format;return t?.type===`json_schema`&&t.json_schema&&(t.json_schema.strict??!0)&&(t.json_schema.strict=!1),super.preparePayload(e)}},Ft=class extends _{constructor(){super(`sambanova`,`https://api.sambanova.ai`)}makeRoute(){return`/v1/embeddings`}async getResponse(e){if(typeof e==`object`&&`data`in e&&Array.isArray(e.data))return e.data.map(e=>e.embedding);throw new h(`Received malformed response from Sambanova feature-extraction (embeddings) API`)}preparePayload(e){return{model:e.model,input:e.args.inputs,...e.args}}},L=`https://api.scaleway.ai`,It=class extends v{constructor(){super(`scaleway`,L)}},Lt=class extends y{constructor(){super(`scaleway`,L)}preparePayload(e){return{model:e.model,...e.args,prompt:e.args.inputs}}async getResponse(e){if(typeof e==`object`&&e&&`choices`in e&&Array.isArray(e.choices)&&e.choices.length>0){let t=e.choices[0];if(typeof t==`object`&&t&&`text`in t&&t.text&&typeof t.text==`string`)return{generated_text:t.text}}throw new h(`Received malformed response from Scaleway text generation API`)}},Rt=class extends _{constructor(){super(`scaleway`,L)}preparePayload(e){return{input:e.args.inputs,model:e.model}}makeRoute(){return`v1/embeddings`}async getResponse(e){return e.data.map(e=>e.embedding)}},R=`https://api.together.xyz`,zt=class extends v{constructor(){super(`together`,R)}preparePayload(e){let t=super.preparePayload(e),n=t.response_format;return n?.type===`json_schema`&&n?.json_schema?.schema&&(t.response_format={type:`json_schema`,schema:n.json_schema.schema}),t}},Bt=class extends y{constructor(){super(`together`,R)}preparePayload(e){return{model:e.model,...e.args,prompt:e.args.inputs}}async getResponse(e){if(typeof e==`object`&&`choices`in e&&Array.isArray(e?.choices)&&typeof e?.model==`string`)return{generated_text:e.choices[0].text};throw new h(`Received malformed response from Together text generation API`)}},Vt=class extends _{constructor(){super(`together`,R)}makeRoute(){return`v1/images/generations`}preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,prompt:e.args.inputs,response_format:e.outputType===`url`?`url`:`base64`,model:e.model}}async getResponse(e,t,n,r){if(typeof e==`object`&&`data`in e&&Array.isArray(e.data)&&e.data.length>0){if(r===`json`)return{...e};if(`url`in e.data[0]&&typeof e.data[0].url==`string`)return e.data[0].url;if(`b64_json`in e.data[0]&&typeof e.data[0].b64_json==`string`){let t=e.data[0].b64_json;return r===`dataUrl`?`data:image/jpeg;base64,${t}`:fetch(`data:image/jpeg;base64,${t}`).then(e=>e.blob())}}throw new h(`Received malformed response from Together text-to-image API`)}},z=`https://api.wavespeed.ai`;async function Ht(e,t){let n=x(new Uint8Array(e instanceof ArrayBuffer?e:await e.arrayBuffer()));return{base:n,images:Array.isArray(t)&&t.every(e=>typeof e==`string`)?t:[n]}}var B=class extends _{constructor(e){super(`wavespeed`,e||z)}makeRoute(e){return`/api/v3/${e.model}`}preparePayload(e){let t={...w(e.args,[`inputs`,`parameters`]),...e.args.parameters?w(e.args.parameters,[`images`]):void 0,prompt:e.args.inputs};return e.mapping?.adapter===`lora`&&(t.loras=[{path:e.mapping.hfModelId,scale:1}]),t}async getResponse(e,t,n,r){if(!t||!n)throw new u(`Headers are required for WaveSpeed AI API calls`);let i=new URL(t),a=new URL(e.data.urls.get).pathname,o=`${`${i.protocol}//${i.host}${i.host===`router.huggingface.co`?`/wavespeed`:``}`}${a}`;for(;;){let e=await fetch(o,{headers:n});if(!e.ok)throw new p(`Failed to fetch response status from WaveSpeed AI API`,{url:o,method:`GET`},{requestId:e.headers.get(`x-request-id`)??``,status:e.status,body:await e.text()});let t=await e.json(),i=t.data;switch(i.status){case`completed`:{if(!i.outputs?.[0])throw new h(`Received malformed response from WaveSpeed AI API: No output URL in completed response`);let e=i.outputs[0];if(r===`url`)return e;if(r===`json`)return t;let n=await fetch(e);if(!n.ok)throw new p(`Failed to fetch generation output from WaveSpeed AI API`,{url:e,method:`GET`},{requestId:n.headers.get(`x-request-id`)??``,status:n.status,body:await n.text()});let a=await n.blob();return r===`dataUrl`?S(a):a}case`failed`:throw new h(i.error||`Task failed`);default:await k(500);continue}}}},Ut=class extends B{constructor(){super(z)}},Wt=class extends B{constructor(){super(z)}async getResponse(e,t,n){return super.getResponse(e,t,n)}},Gt=class extends B{constructor(){super(z)}async preparePayloadAsync(e){let t=e.images??e.parameters?.images,{base:n,images:r}=await Ht(e.inputs,t);return{...e,inputs:e.parameters?.prompt,image:n,images:r}}async getResponse(e,t,n){return super.getResponse(e,t,n)}},Kt=class extends B{constructor(){super(z)}async preparePayloadAsync(e){let t=e.images??e.parameters?.images,{base:n,images:r}=await Ht(e.inputs,t);return{...e,inputs:e.parameters?.prompt,image:n,images:r}}async getResponse(e,t,n){return super.getResponse(e,t,n)}},qt=`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`;function Jt(){let e=Uint8Array.from(Buffer.from(qt,`base64`));return new Blob([e],{type:`image/png`})}var Yt=class extends Gt{constructor(){super()}async preparePayloadAsync(e){let t=e.inputs??Jt();return super.preparePayloadAsync({...e,inputs:t})}},Xt=class extends Kt{constructor(){super()}async preparePayloadAsync(e){let t=e.inputs??Jt();return super.preparePayloadAsync({...e,inputs:t})}},Zt=`https://api.z.ai`,Qt=class extends _{constructor(){super(`zai-org`,Zt)}prepareHeaders(e,t){let n=super.prepareHeaders(e,t);return n[`x-source-channel`]=`hugging_face`,n[`accept-language`]=`en-US,en`,n}},$t=class extends v{constructor(){super(`zai-org`,Zt)}prepareHeaders(e,t){let n=super.prepareHeaders(e,t);return n[`x-source-channel`]=`hugging_face`,n[`accept-language`]=`en-US,en`,n}makeRoute(){return`/api/paas/v4/chat/completions`}},en=60,tn=5e3,nn=class extends Qt{makeRoute(){return`/api/paas/v4/async/images/generations`}preparePayload(e){return{...w(e.args,[`inputs`,`parameters`]),...e.args.parameters,model:e.model,prompt:e.args.inputs}}async getResponse(e,t,n,r){if(!t||!n)throw new u(`URL and headers are required for 'text-to-image' task`);if(typeof e!=`object`||!e||!(`task_status`in e)||!(`id`in e)||typeof e.id!=`string`)throw new h(`Received malformed response from ZAI text-to-image API: expected { id: string, task_status: string }, got: ${JSON.stringify(e)}`);if(e.task_status===`FAIL`)throw new h(`ZAI API returned task status: FAIL`);let i=e.id,a=new URL(t),o=`${`${a.protocol}//${a.host}${a.host===`router.huggingface.co`?`/zai-org`:``}`}/api/paas/v4/async-result/${i}`,s={...n,"x-source-channel":`hugging_face`,"accept-language":`en-US,en`};for(let e=0;e<en;e++){await k(tn);let e=await fetch(o,{method:`GET`,headers:s});if(!e.ok)throw new p(`Failed to fetch result from ZAI text-to-image API: ${e.status}`,{url:o,method:`GET`},{requestId:e.headers.get(`x-request-id`)??``,status:e.status,body:await e.text()});let t=await e.json();if(t.task_status===`FAIL`)throw new h(`ZAI text-to-image API task failed`);if(t.task_status===`SUCCESS`){if(!t.image_result||!Array.isArray(t.image_result)||t.image_result.length===0||typeof t.image_result[0]?.url!=`string`||!A(t.image_result[0].url))throw new h(`Received malformed response from ZAI text-to-image API: expected { image_result: Array<{ url: string }> }, got: ${JSON.stringify(t)}`);let e=t.image_result[0].url;if(r===`json`)return{...t};if(r===`url`)return e;let n=await(await fetch(e)).blob();return r===`dataUrl`?S(n):n}}throw new h(`Timed out while waiting for the result from ZAI API - aborting after ${en} attempts`)}},rn=class extends Qt{makeRoute(){return`/api/paas/v4/layout_parsing`}async preparePayloadAsync(e){let t=`data`in e&&e.data instanceof Blob?e.data:`inputs`in e?typeof e.inputs==`string`&&A(e.inputs)?await fetch(e.inputs).then(e=>e.blob()):e.inputs instanceof Blob?e.inputs:void 0:void 0;if(!t||!(t instanceof Blob))throw new u(`ZAI image-to-text requires a URL string or Blob as inputs`);let n=`data:${t.type||`image/png`};base64,${x(new Uint8Array(await t.arrayBuffer()))}`;return{...`data`in e?w(e,`data`):w(e,`inputs`),inputs:n}}preparePayload(e){return{model:e.model,file:e.args.inputs}}async getResponse(e){let t=e?.md_results;if(typeof t!=`string`)throw new h(`Received malformed response from ZAI layout_parsing API: expected { md_results: string }, got: ${JSON.stringify(e)}`);return{generated_text:t,generatedText:t}}},V={baseten:{conversational:new Fe},"black-forest-labs":{"text-to-image":new ze},cerebras:{conversational:new Be},clarifai:{conversational:new Le},cohere:{conversational:new Ve},deepinfra:{conversational:new Ue,"text-generation":new We},"fal-ai":{"automatic-speech-recognition":new $e,"image-text-to-image":new Ye,"image-text-to-video":new Qe,"image-to-image":new Je,"image-segmentation":new tt,"image-to-video":new Ze,"text-to-image":new qe,"text-to-speech":new et,"text-to-video":new Xe},"featherless-ai":{conversational:new rt,"text-generation":new it},"hf-inference":{"text-to-image":new ne,conversational:new re,"text-generation":new ie,"text-classification":new ge,"question-answering":new _e,"audio-classification":new ae,"automatic-speech-recognition":new oe,"fill-mask":new ve,"feature-extraction":new le,"image-classification":new ue,"image-segmentation":new de,"document-question-answering":new ce,"image-to-text":new fe,"object-detection":new me,"audio-to-audio":new se,"zero-shot-image-classification":new he,"zero-shot-classification":new ye,"image-to-image":new pe,"sentence-similarity":new be,"table-question-answering":new xe,"tabular-classification":new Ee,"text-to-speech":new Te,"token-classification":new Se,translation:new Ce,summarization:new we,"visual-question-answering":new De,"tabular-regression":new Oe,"text-to-audio":new ke},"fireworks-ai":{conversational:new at},groq:{conversational:new ct,"text-generation":new st},hyperbolic:{"text-to-image":new dt,conversational:new lt,"text-generation":new ut},nebius:{"text-to-image":new mt,conversational:new ft,"text-generation":new pt,"feature-extraction":new ht},novita:{conversational:new _t,"text-generation":new gt,"text-to-video":new vt},nscale:{"text-to-image":new xt,conversational:new bt},nvidia:{conversational:new St},openai:{conversational:new wt},ovhcloud:{conversational:new Et,"text-generation":new Dt},publicai:{conversational:new Ot},replicate:{"text-to-image":new kt,"text-to-speech":new At,"text-to-video":new jt,"image-to-image":new Nt,"automatic-speech-recognition":new Mt},sambanova:{conversational:new Pt,"feature-extraction":new Ft},scaleway:{conversational:new It,"text-generation":new Lt,"feature-extraction":new Rt},together:{"text-to-image":new Vt,conversational:new zt,"text-generation":new Bt},wavespeed:{"text-to-image":new Ut,"text-to-video":new Wt,"image-to-image":new Gt,"image-to-video":new Kt,"image-text-to-image":new Yt,"image-text-to-video":new Xt},"zai-org":{conversational:new $t,"text-to-image":new nn,"image-to-text":new rn}};function H(e,t){if(e===`hf-inference`&&!t||e===`auto`)return new T;if(!t)throw new u(`you need to provide a task name when using an external provider, e.g. 'text-to-image'`);if(!(e in V))throw new u(`Provider '${e}' not supported. Available providers: ${Object.keys(V)}`);let n=V[e];if(!n||!(t in n))throw new u(`Task '${t}' not supported for provider '${e}'. Available tasks: ${Object.keys(n??{})}`);return n[t]}var an=`4.13.15`,on=`@huggingface/inference`,sn=null;async function U(e,t,n){let{model:r}=e,i=t.provider,{task:a}=n??{};if(e.endpointUrl&&i!==`hf-inference`)throw new u(`Cannot use endpointUrl with a third-party provider.`);if(r&&A(r))throw new u(`Model URLs are no longer supported. Use endpointUrl instead.`);if(e.endpointUrl)return W(r??e.endpointUrl,t,e,void 0,n);if(!r&&!a)throw new u(`No model provided, and no task has been specified.`);let o=r??await cn(a);if(t.clientSideRoutingOnly&&!r)throw new u(`Provider ${i} requires a model ID to be passed directly.`);let s=t.clientSideRoutingOnly?{provider:i,providerId:un(r,i),hfModelId:r,status:`live`,task:a}:await Ne({modelId:o,task:a,provider:i,accessToken:e.accessToken},{fetch:n?.fetch});if(!s)throw new u(`We have not been able to find inference provider information for model ${o}.`);return W(s.providerId,t,e,s,n)}function W(e,t,n,r,i){let{accessToken:a,endpointUrl:o,provider:c,model:l,urlTransform:d,...f}=n,p=t.provider,{includeCredentials:m,task:h,signal:g,billTo:_,outputType:v}=i??{},y=(()=>{if(t.clientSideRoutingOnly&&a&&a.startsWith(`hf_`))throw new u(`Provider ${p} is closed-source and does not support HF tokens.`);return a?a.startsWith(`hf_`)?`hf-token`:`provider-key`:m===`include`?`credentials-include`:`none`})(),b=o??e,x=t.makeUrl({authMethod:y,model:b,task:h,urlTransform:d}),S=t.prepareHeaders({accessToken:a,authMethod:y},`data`in n&&!!n.data);_&&(S[s]=_),S[`User-Agent`]=[`${on}/${an}`,typeof navigator<`u`?navigator.userAgent:void 0].filter(e=>e!==void 0).join(` `);let ee=t.makeBody({args:f,model:e,task:h,mapping:r,outputType:v}),C;return typeof m==`string`?C=m:m===!0&&(C=`include`),{url:x,info:{headers:S,method:`POST`,body:ee,...C?{credentials:C}:void 0,signal:g}}}async function cn(e){sn||=await ln();let t=sn[e];if((t?.models.length??0)<=0)throw new u(`No default model defined for task ${e}, please define the model explicitly.`);return t.models[0].id}async function ln(){let e=`${i}/api/tasks`,t=await fetch(e);if(!t.ok)throw new m(`Failed to load tasks definitions from Hugging Face Hub.`,{url:e,method:`GET`},{requestId:t.headers.get(`x-request-id`)??``,status:t.status,body:await t.text()});return await t.json()}function un(e,t){if(!e.startsWith(`${t}/`))throw new u(`Models from ${t} must be prefixed by "${t}/". Got "${e}".`);return e.slice(t.length+1)}function dn(e){let t,n,r,i=!1;return function(a){t===void 0?(t=a,n=0,r=-1):t=pn(t,a);let o=t.length,s=0;for(;n<o;){i&&=(t[n]===10&&(s=++n),!1);let a=-1;for(;n<o&&a===-1;++n)switch(t[n]){case 58:r===-1&&(r=n-s);break;case 13:i=!0;case 10:a=n;break}if(a===-1)break;e(t.subarray(s,a),r),s=n,r=-1}s===o?t=void 0:s!==0&&(t=t.subarray(s),n-=s)}}function fn(e,t,n){let r=mn(),i=new TextDecoder;return function(a,o){if(a.length===0)n?.(r),r=mn();else if(o>0){let n=i.decode(a.subarray(0,o)),s=o+(a[o+1]===32?2:1),c=i.decode(a.subarray(s));switch(n){case`data`:r.data=r.data?r.data+`
`+c:c;break;case`event`:r.event=c;break;case`id`:e(r.id=c);break;case`retry`:{let e=parseInt(c,10);isNaN(e)||t(r.retry=e);break}}}}}function pn(e,t){let n=new Uint8Array(e.length+t.length);return n.set(e),n.set(t,e.length),n}function mn(){return{data:``,event:``,id:``,retry:void 0}}function G(e){let t=null;if(e instanceof Blob||e instanceof ArrayBuffer)t=`[Blob or ArrayBuffer]`;else if(typeof e==`string`)try{t=JSON.parse(e)}catch{t=e}return t.accessToken&&=`[REDACTED]`,t}async function K(e,t,n){let{url:r,info:i}=await U(e,t,n),a=await(n?.fetch??fetch)(r,i),o={url:r,info:i};if(n?.retry_on_error!==!1&&a.status===503)return K(e,t,n);if(!a.ok){let t=a.headers.get(`Content-Type`);if([`application/json`,`application/problem+json`].some(e=>t?.startsWith(e))){let t=await a.json();throw[400,422,404,500].includes(a.status)&&n?.chatCompletion?new p(`Provider ${e.provider} does not seem to support chat completion for model ${e.model} . Error: ${JSON.stringify(t.error)}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t}):typeof t.error==`string`||typeof t.detail==`string`||typeof t.message==`string`?new p(`Failed to perform inference: ${t.error??t.detail??t.message}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t}):new p(`Failed to perform inference: an HTTP error occurred when requesting the provider.`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t})}let o=t?.startsWith(`text/plain;`)?await a.text():void 0;throw new p(`Failed to perform inference: ${o??`an HTTP error occurred when requesting the provider`}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:o??``})}return a.headers.get(`Content-Type`)?.startsWith(`application/json`)?{data:await a.json(),requestContext:o}:{data:await a.blob(),requestContext:o}}async function*q(e,t,n){let{url:r,info:i}=await U({...e,stream:!0},t,n),a=await(n?.fetch??fetch)(r,i);if(n?.retry_on_error!==!1&&a.status===503)return yield*q(e,t,n);if(!a.ok){if(a.headers.get(`Content-Type`)?.startsWith(`application/json`)){let t=await a.json();if([400,422,404,500].includes(a.status)&&n?.chatCompletion)throw new p(`Provider ${e.provider} does not seem to support chat completion for model ${e.model} . Error: ${JSON.stringify(t.error)}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t});if(typeof t.error==`string`)throw new p(`Failed to perform inference: ${t.error}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t});if(t.error&&`message`in t.error&&typeof t.error.message==`string`)throw new p(`Failed to perform inference: ${t.error.message}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t});if(typeof t.message==`string`)throw new p(`Failed to perform inference: ${t.message}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t})}throw new p(`Failed to perform inference: an HTTP error occurred when requesting the provider.`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:``})}if(!a.headers.get(`content-type`)?.startsWith(`text/event-stream`))throw new p(`Failed to perform inference: server does not support event stream content type, it returned `+a.headers.get(`content-type`),{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:``});if(!a.body)return;let o=a.body.getReader(),s=[],c=dn(fn(()=>{},()=>{},e=>{s.push(e)}));try{for(;;){let{done:e,value:t}=await o.read();if(e)return;c(t);for(let e of s)if(e.data.length>0){if(e.data===`[DONE]`)return;let t=JSON.parse(e.data);if(typeof t==`object`&&t&&`error`in t)throw new p(`Failed to perform inference: an occurred while streaming the response: ${typeof t.error==`string`?t.error:typeof t.error==`object`&&t.error&&`message`in t.error&&typeof t.error.message==`string`?t.error.message:JSON.stringify(t.error)}`,{url:r,method:i.method??`GET`,headers:i.headers,body:G(i.body)},{requestId:a.headers.get(`x-request-id`)??``,status:a.status,body:t});yield t}s=[]}}finally{o.releaseLock()}}async function hn(e,t){return E().warn(`The request method is deprecated and will be removed in a future version of huggingface.js. Use specific task functions instead.`),(await K(e,H(await O(e.provider,e.model,e.endpointUrl),t?.task),t)).data}async function*gn(e,t){E().warn(`The streamingRequest method is deprecated and will be removed in a future version of huggingface.js. Use specific task functions instead.`),yield*q(e,H(await O(e.provider,e.model,e.endpointUrl),t?.task),t)}function _n(e){return`data`in e?e:{...w(e,`inputs`),data:e.inputs}}async function vn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`audio-classification`),{data:r}=await K(_n(e),n,{...t,task:`audio-classification`});return n.getResponse(r)}async function yn(e,t){let n=`inputs`in e?e.model:void 0,r=H(await O(e.provider,n),`audio-to-audio`),{data:i}=await K(_n(e),r,{...t,task:`audio-to-audio`});return r.getResponse(i)}async function bn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`automatic-speech-recognition`),{data:r}=await K(await n.preparePayloadAsync(e),n,{...t,task:`automatic-speech-recognition`});return n.getResponse(r)}async function xn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`text-to-speech`),{data:r}=await K(e,n,{...t,task:`text-to-speech`});return n.getResponse(r)}function Sn(e){return`data`in e?e:{...w(e,`inputs`),data:e.inputs}}async function Cn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`image-classification`),{data:r}=await K(Sn(e),n,{...t,task:`image-classification`});return n.getResponse(r)}async function wn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`image-segmentation`),{data:r}=await K(await n.preparePayloadAsync(e),n,{...t,task:`image-segmentation`}),{url:i,info:a}=await U(e,n,{...t,task:`image-segmentation`});return n.getResponse(r,i,a.headers)}async function Tn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`image-to-image`),{data:r}=await K(await n.preparePayloadAsync(e),n,{...t,task:`image-to-image`}),{url:i,info:a}=await U(e,n,{...t,task:`image-to-image`});return n.getResponse(r,i,a.headers)}async function En(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`image-to-text`),{data:r}=await K(await n.preparePayloadAsync(e),n,{...t,task:`image-to-text`});return n.getResponse(r)}async function Dn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`image-to-video`),{data:r}=await K(await n.preparePayloadAsync(e),n,{...t,task:`image-to-video`}),{url:i,info:a}=await U(e,n,{...t,task:`image-to-video`});return n.getResponse(r,i,a.headers)}async function On(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`image-text-to-image`),{data:r,requestContext:i}=await K(await n.preparePayloadAsync(e),n,{...t,task:`image-text-to-image`});return n.getResponse(r,i.url,i.info.headers)}async function kn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`image-text-to-video`),{data:r,requestContext:i}=await K(await n.preparePayloadAsync(e),n,{...t,task:`image-text-to-video`});return n.getResponse(r,i.url,i.info.headers)}async function An(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`object-detection`),{data:r}=await K(Sn(e),n,{...t,task:`object-detection`});return n.getResponse(r)}async function jn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`text-to-image`),{data:r}=await K(e,n,{...t,task:`text-to-image`}),{url:i,info:a}=await U(e,n,{...t,task:`text-to-image`});return n.getResponse(r,i,a.headers,t?.outputType)}async function Mn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`text-to-video`),{data:r}=await K(e,n,{...t,task:`text-to-video`}),{url:i,info:a}=await U(e,n,{...t,task:`text-to-video`});return n.getResponse(r,i,a.headers)}async function Nn(e){return e.inputs instanceof Blob?{...e,inputs:{image:x(new Uint8Array(await e.inputs.arrayBuffer()))}}:{...e,inputs:{image:x(new Uint8Array(e.inputs.image instanceof ArrayBuffer?e.inputs.image:await e.inputs.image.arrayBuffer()))}}}async function Pn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`zero-shot-image-classification`),{data:r}=await K(await Nn(e),n,{...t,task:`zero-shot-image-classification`});return n.getResponse(r)}async function Fn(e,t){let n;n=e.endpointUrl?H(await O(e.provider,e.model,e.endpointUrl),`conversational`):!e.provider||e.provider===`auto`?new b:H(await O(e.provider,e.model,e.endpointUrl),`conversational`);let{data:r}=await K(e,n,{...t,task:`conversational`});return n.getResponse(r)}async function*In(e,t){let n;n=e.endpointUrl?H(await O(e.provider,e.model,e.endpointUrl),`conversational`):!e.provider||e.provider===`auto`?new b:H(await O(e.provider,e.model,e.endpointUrl),`conversational`),yield*q(e,n,{...t,task:`conversational`})}async function Ln(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`feature-extraction`),{data:r}=await K(e,n,{...t,task:`feature-extraction`});return n.getResponse(r)}async function Rn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`fill-mask`),{data:r}=await K(e,n,{...t,task:`fill-mask`});return n.getResponse(r)}async function zn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`question-answering`),{data:r}=await K(e,n,{...t,task:`question-answering`});return n.getResponse(r)}async function Bn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`sentence-similarity`),{data:r}=await K(e,n,{...t,task:`sentence-similarity`});return n.getResponse(r)}async function Vn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`summarization`),{data:r}=await K(e,n,{...t,task:`summarization`});return n.getResponse(r)}async function Hn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`table-question-answering`),{data:r}=await K(e,n,{...t,task:`table-question-answering`});return n.getResponse(r)}async function Un(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`text-classification`),{data:r}=await K(e,n,{...t,task:`text-classification`});return n.getResponse(r)}async function Wn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`text-generation`),{data:r}=await K(e,n,{...t,task:`text-generation`});return n.getResponse(r)}async function*Gn(e,t){yield*q(e,H(await O(e.provider,e.model,e.endpointUrl),`text-generation`),{...t,task:`text-generation`})}async function Kn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`token-classification`),{data:r}=await K(e,n,{...t,task:`token-classification`});return n.getResponse(r)}async function qn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`translation`),{data:r}=await K(e,n,{...t,task:`translation`});return n.getResponse(r)}async function Jn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`zero-shot-classification`),{data:r}=await K(e,n,{...t,task:`zero-shot-classification`});return n.getResponse(r)}async function Yn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`document-question-answering`),{data:r}=await K({...e,inputs:{question:e.inputs.question,image:x(new Uint8Array(await e.inputs.image.arrayBuffer()))}},n,{...t,task:`document-question-answering`});return n.getResponse(r)}async function Xn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`visual-question-answering`),{data:r}=await K({...e,inputs:{question:e.inputs.question,image:x(new Uint8Array(await e.inputs.image.arrayBuffer()))}},n,{...t,task:`visual-question-answering`});return n.getResponse(r)}async function Zn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`tabular-classification`),{data:r}=await K(e,n,{...t,task:`tabular-classification`});return n.getResponse(r)}async function Qn(e,t){let n=H(await O(e.provider,e.model,e.endpointUrl),`tabular-regression`),{data:r}=await K(e,n,{...t,task:`tabular-regression`});return n.getResponse(r)}var $n=e({audioClassification:()=>vn,audioToAudio:()=>yn,automaticSpeechRecognition:()=>bn,chatCompletion:()=>Fn,chatCompletionStream:()=>In,documentQuestionAnswering:()=>Yn,featureExtraction:()=>Ln,fillMask:()=>Rn,imageClassification:()=>Cn,imageSegmentation:()=>wn,imageTextToImage:()=>On,imageTextToVideo:()=>kn,imageToImage:()=>Tn,imageToText:()=>En,imageToVideo:()=>Dn,objectDetection:()=>An,questionAnswering:()=>zn,request:()=>hn,sentenceSimilarity:()=>Bn,streamingRequest:()=>gn,summarization:()=>Vn,tableQuestionAnswering:()=>Hn,tabularClassification:()=>Zn,tabularRegression:()=>Qn,textClassification:()=>Un,textGeneration:()=>Wn,textGenerationStream:()=>Gn,textToImage:()=>jn,textToSpeech:()=>xn,textToVideo:()=>Mn,tokenClassification:()=>Kn,translation:()=>qn,visualQuestionAnswering:()=>Xn,zeroShotClassification:()=>Jn,zeroShotImageClassification:()=>Pn});function er(e){return Object.entries(e)}var tr=class e{accessToken;defaultOptions;constructor(e=``,t={}){this.accessToken=e,this.defaultOptions=t;for(let[n,r]of er($n))Object.defineProperty(this,n,{enumerable:!1,value:(n,i)=>r({endpointUrl:t.endpointUrl,accessToken:e,...n},{...w(t,[`endpointUrl`]),...i})})}endpoint(t){return new e(this.accessToken,{...this.defaultOptions,endpointUrl:t})}},nr={baseten:`baseten`,"black-forest-labs":`black-forest-labs`,cerebras:`cerebras`,clarifai:`clarifai`,cohere:`CohereLabs`,deepinfra:`DeepInfra`,"fal-ai":`fal`,"featherless-ai":`featherless-ai`,"fireworks-ai":`fireworks-ai`,groq:`groq`,"hf-inference":`hf-inference`,hyperbolic:`Hyperbolic`,nebius:`nebius`,novita:`novita`,nscale:`nscale`,nvidia:`nvidia`,openai:`openai`,ovhcloud:`ovhcloud`,publicai:`publicai`,replicate:`replicate`,sambanova:`sambanovasystems`,scaleway:`scaleway`,together:`togethercomputer`,wavespeed:`wavespeed`,"zai-org":`zai-org`},rr={js:{fetch:{basic:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,basicAudio:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "audio/flac",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,basicImage:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,conversational:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ 
{{ autoInputs.asTsString }}
}).then((response) => {
    console.log(JSON.stringify(response));
});`,imageToImage:`const image = fs.readFileSync("{{inputs.asObj.inputs}}");

async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: {
				"inputs": \`data:image/png;base64,\${data.inputs.encode("base64")}\`,
				"parameters": data.parameters,
			}
		}
	);
	const result = await response.json();
	return result;
}

query({ 
	inputs: image,
	parameters: {
		prompt: "{{ inputs.asObj.parameters.prompt }}",
	}
}).then((response) => {
    console.log(JSON.stringify(response));
});`,imageToVideo:`const image = fs.readFileSync("{{inputs.asObj.inputs}}");

async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: {
				"image_url": \`data:image/png;base64,\${data.image.encode("base64")}\`,
				"prompt": data.prompt,
			}
		}
	);
	const result = await response.json();
	return result;
}

query({
	"image": image,
	"prompt": "{{inputs.asObj.parameters.prompt}}",
}).then((response) => {
    // Use video
});`,textToAudio:`{% if model.library_name == "transformers" %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    // Returns a byte object of the Audio wavform. Use it directly!
});
{% else %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    const result = await response.json();
    return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});
{% endif %} `,textToImage:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}


query({ {{ providerInputs.asTsString }} }).then((response) => {
    // Use image
});`,textToSpeech:`{% if model.library_name == "transformers" %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    return result;
}

query({ text: {{ inputs.asObj.inputs }} }).then((response) => {
    // Returns a byte object of the Audio wavform. Use it directly!
});
{% else %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    const result = await response.json();
    return result;
}

query({ text: {{ inputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});
{% endif %} `,zeroShotClassification:`async function query(data) {
    const response = await fetch(
		"{{ fullUrl }}",
        {
            headers: {
				Authorization: "{{ authorizationHeader }}",
                "Content-Type": "application/json",
{% if billTo %}
                "X-HF-Bill-To": "{{ billTo }}",
{% endif %}         },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({
    inputs: {{ providerInputs.asObj.inputs }},
    parameters: { candidate_labels: ["refund", "legal", "faq"] }
}).then((response) => {
    console.log(JSON.stringify(response));
});`},"huggingface.js":{basic:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,basicAudio:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync({{inputs.asObj.inputs}});

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	data,
	model: "{{ model.id }}",
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,basicImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync({{inputs.asObj.inputs}});

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	data,
	model: "{{ model.id }}",
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,conversational:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const chatCompletion = await client.chatCompletion({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
{% if directRequest %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
{% else %}
    model: "{{ providerModelId }}",
{% endif %}
{{ inputs.asTsString }}
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});

console.log(chatCompletion.choices[0].message);`,conversationalStream:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

let out = "";

const stream = client.chatCompletionStream({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    model: "{{ providerModelId }}",
{{ inputs.asTsString }}
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});

for await (const chunk of stream) {
	if (chunk.choices && chunk.choices.length > 0) {
		const newContent = chunk.choices[0].delta.content;
		out += newContent;
		console.log(newContent);
	}
}`,imageToImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync("{{inputs.asObj.inputs}}");

const image = await client.imageToImage({
{% if endpointUrl %}
	endpointUrl: "{{ endpointUrl }}",
{% endif %}
	provider: "{{provider}}",
	model: "{{model.id}}",
	inputs: data,
	parameters: { prompt: "{{inputs.asObj.parameters.prompt}}", },
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});
/// Use the generated image (it's a Blob)
// For example, you can save it to a file or display it in an image element
`,imageToVideo:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync("{{inputs.asObj.inputs}}");

const video = await client.imageToVideo({
{% if endpointUrl %}
	endpointUrl: "{{ endpointUrl }}",
{% endif %}
	provider: "{{provider}}",
	model: "{{model.id}}",
	inputs: data,
	parameters: { prompt: "{{inputs.asObj.parameters.prompt}}", },
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

/// Use the generated video (it's a Blob)
// For example, you can save it to a file or display it in a video element
`,textToImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const image = await client.textToImage({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
	parameters: { num_inference_steps: 5 },
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
/// Use the generated image (it's a Blob)`,textToSpeech:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const audio = await client.textToSpeech({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
// Use the generated audio (it's a Blob)`,textToVideo:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const video = await client.textToVideo({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
// Use the generated video (it's a Blob)`},openai:{conversational:`import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "{{ baseUrl }}",
	apiKey: "{{ accessToken }}",
{% if billTo %}
	defaultHeaders: {
		"X-HF-Bill-To": "{{ billTo }}" 
	}
{% endif %}
});

const chatCompletion = await client.chat.completions.create({
	model: "{{ providerModelId }}",
{{ inputs.asTsString }}
});

console.log(chatCompletion.choices[0].message);`,conversationalStream:`import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "{{ baseUrl }}",
	apiKey: "{{ accessToken }}",
{% if billTo %}
    defaultHeaders: {
		"X-HF-Bill-To": "{{ billTo }}" 
	}
{% endif %}
});

const stream = await client.chat.completions.create({
    model: "{{ providerModelId }}",
{{ inputs.asTsString }}
    stream: true,
});

for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`}},python:{fal_client:{imageToImage:`{%if provider == "fal-ai" %}
import fal_client
import base64

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

with open("{{inputs.asObj.inputs}}", "rb") as image_file:
    image_base_64 = base64.b64encode(image_file.read()).decode('utf-8')

result = fal_client.subscribe(
    "fal-ai/flux-kontext/dev",
    arguments={
        "prompt": f"data:image/png;base64,{image_base_64}",
        "image_url": "{{ providerInputs.asObj.inputs }}",
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
{%endif%}
`,imageToVideo:`{%if provider == "fal-ai" %}
import fal_client
import base64

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

with open("{{inputs.asObj.inputs}}", "rb") as image_file:
    image_base_64 = base64.b64encode(image_file.read()).decode('utf-8')

result = fal_client.subscribe(
    "{{model.id}}",
    arguments={
        "image_url": f"data:image/png;base64,{image_base_64}",
        "prompt": "{{inputs.asObj.parameters.prompt}}",
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
{%endif%}
`,textToImage:`{% if provider == "fal-ai" %}
import fal_client

{% if providerInputs.asObj.loras is defined and providerInputs.asObj.loras != none %}
result = fal_client.subscribe(
    "{{ providerModelId }}",
    arguments={
        "prompt": {{ inputs.asObj.inputs }},
        "loras":{{ providerInputs.asObj.loras | tojson }},
    },
)
{% else %}
result = fal_client.subscribe(
    "{{ providerModelId }}",
    arguments={
        "prompt": {{ inputs.asObj.inputs }},
    },
)
{% endif %} 
print(result)
{% endif %} `},huggingface_hub:{basic:`result = client.{{ methodName }}(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
)`,basicAudio:`output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")`,basicImage:`output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")`,conversational:`completion = client.chat.completions.create(
{% if directRequest %}
    model="{{ model.id }}",
{% else %}
    model="{{ providerModelId }}",
{% endif %}
{{ inputs.asPythonString }}
)

print(completion.choices[0].message) `,conversationalStream:`stream = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="") `,documentQuestionAnswering:`output = client.document_question_answering(
    "{{ inputs.asObj.image }}",
    question="{{ inputs.asObj.question }}",
    model="{{ model.id }}",
) `,imageToImage:`with open("{{ inputs.asObj.inputs }}", "rb") as image_file:
   input_image = image_file.read()

# output is a PIL.Image object
image = client.image_to_image(
    input_image,
    prompt="{{ inputs.asObj.parameters.prompt }}",
    model="{{ model.id }}",
)
`,imageToVideo:`with open("{{ inputs.asObj.inputs }}", "rb") as image_file:
   input_image = image_file.read()

video = client.image_to_video(
    input_image,
    prompt="{{ inputs.asObj.parameters.prompt }}",
    model="{{ model.id }}",
) 
`,importInferenceClient:`from huggingface_hub import InferenceClient

client = InferenceClient(
{% if endpointUrl %}
    base_url="{{ baseUrl }}",
{% endif %}
{% if task != "conversational" or directRequest %}
    provider="{{ provider }}",
{% endif %}
    api_key="{{ accessToken }}",
{% if billTo %}
    bill_to="{{ billTo }}",
{% endif %}
)`,questionAnswering:`answer = client.question_answering(
    question="{{ inputs.asObj.question }}",
    context="{{ inputs.asObj.context }}",
    model="{{ model.id }}",
) `,tableQuestionAnswering:`answer = client.table_question_answering(
    query="{{ inputs.asObj.query }}",
    table={{ inputs.asObj.table }},
    model="{{ model.id }}",
) `,textToImage:`# output is a PIL.Image object
image = client.text_to_image(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) `,textToSpeech:`# audio is returned as bytes
audio = client.text_to_speech(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) 
`,textToVideo:`video = client.text_to_video(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) `},openai:{conversational:`from openai import OpenAI

client = OpenAI(
    base_url="{{ baseUrl }}",
    api_key="{{ accessToken }}",
{% if billTo %}
    default_headers={
        "X-HF-Bill-To": "{{ billTo }}"
    }
{% endif %}
)

completion = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
)

print(completion.choices[0].message) `,conversationalStream:`from openai import OpenAI

client = OpenAI(
    base_url="{{ baseUrl }}",
    api_key="{{ accessToken }}",
{% if billTo %}
    default_headers={
        "X-HF-Bill-To": "{{ billTo }}"
    }
{% endif %}
)

stream = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")`},requests:{basic:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {{ providerInputs.asObj.inputs }},
}) `,basicAudio:`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers={"Content-Type": "audio/flac", **headers}, data=data)
    return response.json()

output = query({{ providerInputs.asObj.inputs }})`,basicImage:`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers={"Content-Type": "image/jpeg", **headers}, data=data)
    return response.json()

output = query({{ providerInputs.asObj.inputs }})`,conversational:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

response = query({
{{ autoInputs.asJsonString }}
})

print(response["choices"][0]["message"])`,conversationalStream:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload, stream=True)
    for line in response.iter_lines():
        if not line.startswith(b"data:"):
            continue
        if line.strip() == b"data: [DONE]":
            return
        yield json.loads(line.decode("utf-8").lstrip("data:").rstrip("/n"))

chunks = query({
{{ autoInputs.asJsonString }},
    "stream": True,
})

for chunk in chunks:
    print(chunk["choices"][0]["delta"]["content"], end="")`,documentQuestionAnswering:`def query(payload):
    with open(payload["image"], "rb") as f:
        img = f.read()
        payload["image"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {
        "image": "{{ inputs.asObj.image }}",
        "question": "{{ inputs.asObj.question }}",
    },
}) `,imageToImage:`
def query(payload):
    with open(payload["inputs"], "rb") as f:
        img = f.read()
        payload["inputs"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

image_bytes = query({
{{ providerInputs.asJsonString }}
})

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes)) `,imageToVideo:`
def query(payload):
    with open(payload["inputs"], "rb") as f:
        img = f.read()
        payload["inputs"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

video_bytes = query({
{{ inputs.asJsonString }}
})
`,importRequests:`{% if importBase64 %}
import base64
{% endif %}
{% if importJson %}
import json
{% endif %}
import requests

API_URL = "{{ fullUrl }}"
headers = {
    "Authorization": "{{ authorizationHeader }}",
{% if billTo %}
    "X-HF-Bill-To": "{{ billTo }}"
{% endif %}
}`,tabular:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

response = query({
    "inputs": {
        "data": {{ providerInputs.asObj.inputs }}
    },
}) `,textToAudio:`{% if model.library_name == "transformers" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

audio_bytes = query({
    "inputs": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio_bytes)
{% else %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

audio, sampling_rate = query({
    "inputs": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio, rate=sampling_rate)
{% endif %} `,textToImage:`{% if provider == "hf-inference" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

image_bytes = query({
    "inputs": {{ providerInputs.asObj.inputs }},
})

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))
{% endif %}`,textToSpeech:`{% if model.library_name == "transformers" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

audio_bytes = query({
    "text": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio_bytes)
{% else %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

audio, sampling_rate = query({
    "text": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio, rate=sampling_rate)
{% endif %} `,zeroShotClassification:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {{ providerInputs.asObj.inputs }},
    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
}) `,zeroShotImageClassification:`def query(data):
    with open(data["image_path"], "rb") as f:
        img = f.read()
    payload={
        "parameters": data["parameters"],
        "inputs": base64.b64encode(img).decode("utf-8")
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "image_path": {{ providerInputs.asObj.inputs }},
    "parameters": {"candidate_labels": ["cat", "dog", "llama"]},
}) `}},sh:{curl:{basic:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ providerInputs.asCurlString }}
    }'`,basicAudio:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: audio/flac' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    --data-binary @{{ providerInputs.asObj.inputs }}`,basicImage:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: image/jpeg' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    --data-binary @{{ providerInputs.asObj.inputs }}`,conversational:`curl {{ fullUrl }} \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ autoInputs.asCurlString }},
        "stream": false
    }'`,conversationalStream:`curl {{ fullUrl }} \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ autoInputs.asCurlString }},
        "stream": true
    }'`,zeroShotClassification:`curl {{ fullUrl }} \\
    -X POST \\
    -d '{"inputs": {{ providerInputs.asObj.inputs }}, "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: {{ authorizationHeader }}'
{% if billTo %} \\
    -H 'X-HF-Bill-To: {{ billTo }}'
{% endif %}`}}},ir=[`openai`,`huggingface_hub`,`fal_client`,`requests`],ar=[`openai`,`huggingface.js`,`fetch`],or=[`curl`],sr={js:[...ar],python:[...ir],sh:[...or]},cr={js:[`huggingface.js`],python:[`huggingface_hub`]},lr=(e,t,n)=>rr[e]?.[t]?.[n]!==void 0,J=(e,t,r)=>{let i=rr[e]?.[t]?.[r];if(!i)throw Error(`Template not found: ${e}/${t}/${r}`);return e=>new n(i).render({...e})},ur=J(`python`,`huggingface_hub`,`importInferenceClient`),dr=J(`python`,`requests`,`importRequests`),fr={"audio-classification":`audio_classification`,"audio-to-audio":`audio_to_audio`,"automatic-speech-recognition":`automatic_speech_recognition`,"document-question-answering":`document_question_answering`,"feature-extraction":`feature_extraction`,"fill-mask":`fill_mask`,"image-classification":`image_classification`,"image-segmentation":`image_segmentation`,"image-to-image":`image_to_image`,"image-to-video":`image_to_video`,"image-to-text":`image_to_text`,"image-text-to-image":`image_text_to_image`,"image-text-to-video":`image_text_to_video`,"object-detection":`object_detection`,"question-answering":`question_answering`,"sentence-similarity":`sentence_similarity`,summarization:`summarization`,"table-question-answering":`table_question_answering`,"tabular-classification":`tabular_classification`,"tabular-regression":`tabular_regression`,"text-classification":`text_classification`,"text-generation":`text_generation`,"text-to-image":`text_to_image`,"text-to-speech":`text_to_speech`,"text-to-video":`text_to_video`,"token-classification":`token_classification`,translation:`translation`,"visual-question-answering":`visual_question_answering`,"zero-shot-classification":`zero_shot_classification`,"zero-shot-image-classification":`zero_shot_image_classification`},Y={"automatic-speech-recognition":`automaticSpeechRecognition`,"feature-extraction":`featureExtraction`,"fill-mask":`fillMask`,"image-classification":`imageClassification`,"question-answering":`questionAnswering`,"sentence-similarity":`sentenceSimilarity`,summarization:`summarization`,"table-question-answering":`tableQuestionAnswering`,"text-classification":`textClassification`,"text-generation":`textGeneration`,"token-classification":`tokenClassification`,"text-to-speech":`textToSpeech`,translation:`translation`},pr=`hf_token_placeholder`,mr=`not_hf_token_placeholder`,X=(e,n)=>(i,a,s,c)=>{let l=E(),u=s?.providerId??i.id,d=i.pipeline_tag;i.pipeline_tag&&[`text-generation`,`image-text-to-text`].includes(i.pipeline_tag)&&i.tags.includes(`conversational`)&&(e=c?.streaming?`conversationalStream`:`conversational`,n=gr,d=`conversational`);let f;try{f=H(a,d)}catch(e){return l.error(`Failed to get provider helper for ${a} (${d})`,e),[]}let p=c?.directRequest?mr:pr,m=c?.accessToken??p,h=c?.inputs?{inputs:c.inputs}:n?n(i,c):{inputs:t(i)},g=W(u,f,{accessToken:m,provider:a,endpointUrl:c?.endpointUrl??(a===`auto`?o:void 0),...h},s,{task:d,billTo:c?.billTo}),_=h,v=g.info.body;if(typeof v==`string`)try{_=JSON.parse(v)}catch(e){l.error(`Failed to parse body as JSON`,e)}let y=!c?.endpointUrl&&!c?.directRequest?a===`auto`?{...h,model:`${i.id}`}:{...h,model:`${i.id}:${a}`}:_,b={accessToken:m,authorizationHeader:g.info.headers?.Authorization,baseUrl:d===`conversational`&&!c?.endpointUrl&&!c?.directRequest?o:Sr(g.url,`/chat/completions`),fullUrl:d===`conversational`&&!c?.endpointUrl&&!c?.directRequest?o+`/chat/completions`:g.url,inputs:{asObj:h,asCurlString:Q(h,`curl`),asJsonString:Q(h,`json`),asPythonString:Q(h,`python`),asTsString:Q(h,`ts`)},providerInputs:{asObj:_,asCurlString:Q(_,`curl`),asJsonString:Q(_,`json`),asPythonString:Q(_,`python`),asTsString:Q(_,`ts`)},autoInputs:{asObj:y,asCurlString:Q(y,`curl`),asJsonString:Q(y,`json`),asPythonString:Q(y,`python`),asTsString:Q(y,`ts`)},model:i,provider:a,providerModelId:d===`conversational`&&!c?.endpointUrl&&!c?.directRequest?a===`auto`?i.id:`${i.id}:${a}`:u??i.id,billTo:c?.billTo,endpointUrl:c?.endpointUrl,task:d,directRequest:!!c?.directRequest},x=a===`auto`&&d!==`conversational`?cr:sr;return r.map(t=>(x[t]??[]).map(n=>{if(!lr(t,n,e))return;let r=J(t,n,e);if(n===`huggingface_hub`&&e.includes(`basic`)){if(!(i.pipeline_tag&&i.pipeline_tag in fr))return;b.methodName=fr[i.pipeline_tag]}if(n===`huggingface.js`&&e.includes(`basic`)){if(!(i.pipeline_tag&&i.pipeline_tag in Y))return;b.methodName=Y[i.pipeline_tag]}let o=r(b).trim();if(o)return n===`huggingface_hub`?o=`${ur({...b})}\n\n${o}`:n===`requests`&&(o=`${dr({...b,importBase64:o.includes(`base64`),importJson:o.includes(`json.`)})}\n\n${o}`),o.includes(p)&&(o=Cr(c?.directRequest,p,o,t,a,c?.endpointUrl)),{language:t,client:n,content:o}}).filter(e=>e!==void 0)).flat()},hr=e=>JSON.parse(t(e)),Z=e=>{let n=JSON.parse(t(e));return{inputs:n.image,parameters:{prompt:n.prompt}}},gr=(e,n)=>({messages:n?.messages??t(e),...n?.temperature?{temperature:n?.temperature}:void 0,...n?.max_tokens?{max_tokens:n?.max_tokens}:void 0,...n?.top_p?{top_p:n?.top_p}:void 0}),_r=e=>{let n=JSON.parse(t(e));return{question:n.question,context:n.context}},vr=e=>{let n=JSON.parse(t(e));return{query:n.query,table:JSON.stringify(n.table)}},yr={"audio-classification":X(`basicAudio`),"audio-to-audio":X(`basicAudio`),"automatic-speech-recognition":X(`basicAudio`),"document-question-answering":X(`documentQuestionAnswering`,hr),"feature-extraction":X(`basic`),"fill-mask":X(`basic`),"image-classification":X(`basicImage`),"image-segmentation":X(`basicImage`),"image-text-to-image":X(`imageToImage`,Z),"image-text-to-text":X(`conversational`),"image-text-to-video":X(`imageToVideo`,Z),"image-to-image":X(`imageToImage`,Z),"image-to-text":X(`basicImage`),"image-to-video":X(`imageToVideo`,Z),"object-detection":X(`basicImage`),"question-answering":X(`questionAnswering`,_r),"sentence-similarity":X(`basic`),summarization:X(`basic`),"tabular-classification":X(`tabular`),"tabular-regression":X(`tabular`),"table-question-answering":X(`tableQuestionAnswering`,vr),"text-classification":X(`basic`),"text-generation":X(`basic`),"text-to-audio":X(`textToAudio`),"text-to-image":X(`textToImage`),"text-to-speech":X(`textToSpeech`),"text-to-video":X(`textToVideo`),"token-classification":X(`basic`),translation:X(`basic`),"zero-shot-classification":X(`zeroShotClassification`),"zero-shot-image-classification":X(`zeroShotImageClassification`)};function br(e,t,n,r){return e.pipeline_tag&&e.pipeline_tag in yr?yr[e.pipeline_tag]?.(e,t,n,r)??[]:[]}function Q(e,t){switch(t){case`curl`:return xr(Q(e,`json`));case`json`:return JSON.stringify(e,null,4).split(`
`).slice(1,-1).join(`
`);case`python`:return xr(Object.entries(e).map(([e,t])=>`${e}=${JSON.stringify(t,null,4).replace(/"/g,`"`)},`).join(`
`));case`ts`:return $(e).split(`
`).slice(1,-1).join(`
`);default:throw Error(`Unsupported format: ${t}`)}}function $(e,t){return t??=0,typeof e!=`object`||!e?JSON.stringify(e):Array.isArray(e)?`[\n${e.map(e=>{let n=$(e,t+1);return`${` `.repeat(4*(t+1))}${n},`}).join(`
`)}\n${` `.repeat(4*t)}]`:`{\n${Object.entries(e).map(([e,n])=>{let r=$(n,t+1),i=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(e)?e:`"${e}"`;return`${` `.repeat(4*(t+1))}${i}: ${r},`}).join(`
`)}\n${` `.repeat(4*t)}}`}function xr(e){return e.split(`
`).map(e=>` `.repeat(4)+e).join(`
`)}function Sr(e,t){return e.endsWith(t)?e.slice(0,-t.length):e}function Cr(e,t,n,r,i,a){let o=!a&&(i==`hf-inference`||!e&&(n.includes(`InferenceClient`)||n.includes(`https://router.huggingface.co`)))?`HF_TOKEN`:a?`API_TOKEN`:i.toUpperCase().replace(`-`,`_`)+`_API_KEY`;return r===`sh`?n=n.replace(`'Authorization: Bearer ${t}'`,`"Authorization: Bearer $${o}"`):r===`python`?(n=`import os
`+n,n=n.replace(`"${t}"`,`os.environ["${o}"]`),n=n.replace(`"Bearer ${t}"`,`f"Bearer {os.environ['${o}']}"`),n=n.replace(`"Key ${t}"`,`f"Key {os.environ['${o}']}"`),n=n.replace(`"X-Key ${t}"`,`f"X-Key {os.environ['${o}']}"`)):r===`js`&&(n=n.replace(`"${t}"`,`process.env.${o}`),n=n.replace(`Authorization: "Bearer ${t}",`,`Authorization: \`Bearer $\{process.env.${o}}\`,`),n=n.replace(`Authorization: "Key ${t}",`,`Authorization: \`Key $\{process.env.${o}}\`,`),n=n.replace(`Authorization: "X-Key ${t}",`,`Authorization: \`X-Key $\{process.env.${o}}\`,`)),n}var wr=e({getInferenceSnippets:()=>br});export{wn as A,jn as C,Dn as D,On as E,vn as F,xn as M,bn as N,En as O,yn as P,Mn as S,kn as T,Rn as _,Qn as a,Fn as b,Jn as c,Wn as d,Un as f,zn as g,Bn as h,tr as i,Cn as j,Tn as k,qn as l,Vn as m,br as n,Zn as o,Hn as p,nr as r,Xn as s,wr as t,Kn as u,Ln as v,An as w,Pn as x,In as y};