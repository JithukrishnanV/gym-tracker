---
trigger: always_on
---

https://vercel.com/docs/limits?query=limits#plan-limits



Limits
Limits
Last updated March 2, 2026
General limits
To prevent abuse of our platform, we apply the following limits to all accounts.

Hobby	Pro	Enterprise
Projects	200	Unlimited	Unlimited
Deployments Created per Day	100	6000	Custom
Functions Created per Deployment	Framework-dependent*	∞	∞
Proxied Request Timeout (Seconds)	120	120	120
Deployments Created from CLI per Week	2000	2000	Custom
Vercel Projects Connected per Git Repository	10	60	Custom
Routes created per Deployment	2048	2048	Custom
Build Time per Deployment (Minutes)	45	45	45
Static File uploads	100 MB	1 GB	N/A
Concurrent Builds	1	12	Custom
Disk Size (GB)	23	23 up to 64	23 up to 64
Cron Jobs (per project)	100*	100	100
Included usage
Hobby	Pro
Active CPU	4 CPU-hrs	N/A
Provisioned Memory	360 GB-hrs	N/A
Invocations	1 million	N/A
Fast Data Transfer	100 GB	1 TB
Fast Origin Transfer	Up to 10 GB	N/A
Build Execution	6,000 Mins	N/A
Image Optimization Source Images	1000 Images	N/A
For Teams on the Pro plan, you can pay for usage on-demand.

On-demand resources for Pro
For members of our Pro plan, we offer an included credit that can be used across all resources and a pay-as-you-go model for additional consumption, giving you greater flexibility and control over your usage. The typical monthly usage guidelines above are still applicable, while extra usage will be automatically charged at the following rates:

Managed Infrastructure pricing
Resource
Unit (Billing Cycle)
Function Invocations

$0.6 per 1,000,000 Invocations
Image Optimization Source Images (Legacy)

$5.00 per 1,000 Images
Edge Config Reads

$3.00 per 1,000,000 Reads
Edge Config Writes

$1.00
Web Analytics Events

$3.00 per 1 Event
Speed Insights Data Points

$0.65 per 10,000 Data points
Monitoring Events

$1.20 per 1,000,000 Events
Observability Plus Events

$1.20 per 1,000,000 Data Events
Workflow Events

$20 per 1,000,000 Events
Workflow Data Written

$0.50 per GB
Workflow Data Retained

$0.50 per GB per month
Drains

$0.5 per 1 GB
To learn more about Managed Infrastructure on the Pro plan, and how to understand your invoices, see understanding my invoice.

Pro trial limits
See the Pro trial limitations section for information on the limits that apply to Pro trials.

Routes created per deployment
The limit of "Routes created per Deployment" encapsulates several options that can be configured on Vercel:

If you are using a vercel.json configuration file, each rewrite, redirect, or header is counted as a Route
If you are using the Build Output API, you might configure routes for your deployments
Note that most frameworks will create Routes automatically for you. For example, Next.js will create a set of Routes corresponding to your use of dynamic routes, redirects, rewrites and custom headers.

Build time per deployment
The maximum duration of the Build Step is 45 minutes. When the limit is reached, the Build Step will be interrupted and the Deployment will fail.

Build container resources
Every build container has a fixed amount of resources available to it. You can find the resources available for each build machine type here.

For more information on troubleshooting these, see Build container resources.

Static file uploads
When using the CLI to deploy, the maximum size of the source files that can be uploaded is limited to 100 MB for Hobby and 1 GB for Pro. If the size of the source files exceeds this limit, the deployment will fail.

Build cache maximum size
The maximum size of the Build's cache is 1 GB. It is retained for one month and it applies at the level of each Build cache key.

Monitoring
Check out the limits and pricing section for more details about the limits of the Monitoring feature on Vercel.

Logs
There are two types of logs: build logs and runtime logs. Both have different behaviors when storing logs.

Build logs are stored indefinitely for each deployment.

Runtime logs are stored for 1 hour on Hobby, 1 day on Pro, and for 3 days on Enterprise accounts. To learn more about these log limits, read here.

Environment variables
The maximum number of Environment Variables per environment per Project is 1000. For example, you cannot have more than 1000 Production Environment Variables.

The total size of your Environment Variables, names and values, is limited to 64KB for projects using Node.js, Python, Ruby, Go, Java, and .NET runtimes. This limit is the total allowed for each deployment, and is also the maximum size of any single Environment Variable. For more information, see the Environment Variables documentation.

If you are using System Environment Variables, the framework-specific ones (i.e. those prefixed by the framework name) are exposed only during the Build Step, but not at runtime. However, the non-framework-specific ones are exposed at runtime. Only the Environment Variables that are exposed at runtime are counted towards the size limit.

Domains
Hobby	Pro	Enterprise
Domains per Project	50	Unlimited*	Unlimited*
To prevent abuse, Vercel implements soft limits of 100,000 domains per project for the Pro plan and 1,000,000 domains for the Enterprise plan. These limits are flexible and can be increased upon request. If you need more domains, please contact our support team for assistance.
Files
The maximum number of files that can be uploaded when creating a CLI Deployment is 15,000 for source files. Deployments that contain more files than the limit will fail at the build step.

Although there is no upper limit for output files created during a build, you can expect longer build times as a result of having many thousands of output files (100,000 or more, for example). If the build time exceeds 45 minutes then the build will fail.

We recommend using Incremental Static Regeneration (ISR) to help reduce build time. Using ISR will allow you pre-render a subset of the total number of pages at build time, giving you faster builds and the ability to generate pages on-demand.

Proxied request timeout
The amount of time (in seconds) that a proxied request (rewrites or routes with an external destination) is allowed to process an HTTP request. The maximum timeout is 120 seconds (2 minutes). If the external server does not reply until the maximum timeout is reached, an error with the message ROUTER_EXTERNAL_TARGET_ERROR will be returned.

WebSockets
Vercel Functions do not support acting as a WebSocket server.

We recommend third-party solutions to enable realtime communication for Deployments.

Web Analytics
See the Limits and Pricing section for more details about the limits of Vercel Web Analytics.

Speed Insights
See the Limits and Pricing doc for more details about the limits of the Speed Insights feature on Vercel.

Cron Jobs
See the Cron Jobs limits section for more information about the limits of Cron Jobs on Vercel.

Vercel Workflows limits
Vercel Workflows limits include concurrency limits of up to 100,000, 50 MB max payload size, and 2 GB max entity storage per run. See Workflow pricing and limits for the full list of run, stream, and platform constraints.

Vercel Functions
The limits of Vercel functions are based on the runtime that you use.

For example, different runtimes allow for different bundle sizes, maximum duration, and memory.

If you have an existing project, deployed to Vercel before April 23rd 2025 and not using Fluid compute, Vercel Functions have the following defaults and maximum limits for the duration of a function:

Default	Maximum
Hobby	10s	60s (1 minute)
Pro	15s	300s (5 minutes)
Enterprise	15s	900s (15 minutes)
Connecting a project to a Git repository
​Vercel does not support connecting a project on your Hobby team to Git repositories owned by Git organizations. You can either switch to an existing Team or create a new one.

The same limitation applies in the Project creation flow when importing an existing Git repository or when cloning a Vercel template to a new Git repository as part of your Git organization.

Reserved variables
See the Reserved Environment Variables docs for more information.

Rate limits
Rate limits are hard limits that apply to the platform when performing actions that require a response from our API.

The rate limits table consists of the following four columns:

Description - A brief summary of the limit which, where relevant, will advise what type of plan it applies to.
Limit - The amount of actions permitted within the amount of time (Duration) specified.
Duration - The amount of time (seconds) in which you can perform the specified amount of actions. Once a rate limit is hit, it will be reset after the Duration has expired.
Scope - How the rate limit is applied:
owner - Rate limit applies to the team or to an individual user, depending on the resource.
user - Rate limit applies to an individual user.
team - Rate limit applies to the team.
Rate limit examples
Below are five examples that provide further information on how rate limits work.

Domain deletion
You are able to delete up to 60 domains every 60 seconds (1 minute). Should you hit the rate limit, you will need to wait another minute before you can delete another domain.

Team deletion
You are able to delete up to 20 teams every 3600 seconds (1 hour). Should y
